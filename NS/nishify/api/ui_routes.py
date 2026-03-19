import os
import markdown
from fastapi import APIRouter, Query, Request, HTTPException, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from nishify.api.state import source_router, _default_source
from nishify.core.sources.postgres import PostgresSource
from nishify.core.sources.elastic import ElasticSource
from pydantic import BaseModel

ui_router = APIRouter()

# Global tracked source state for demo purposes only
_active_source_name = "memory"

class SourceChange(BaseModel):
    source_name: str

@ui_router.post("/set_source", include_in_schema=False)
async def set_source(payload: SourceChange):
    global _active_source_name
    src = payload.source_name
    
    try:
        if src == "postgres":
            db_url = os.getenv("POSTGRES_URL", "postgresql+psycopg2://nishify:nishify_password@localhost:5433/nishify_studio")
            new_source = PostgresSource(db_url)
        elif src == "elastic":
            es_url = os.getenv("ELASTIC_URL", "http://localhost:9201")
            new_source = ElasticSource(es_url)
        elif src == "memory":
            new_source = _default_source
        else:
            raise HTTPException(400, "Unknown source adapter")

        source_router.set_default_source(new_source)
        _active_source_name = src
        return {"status": "ok", "source": src}
    except Exception as e:
        raise HTTPException(500, f"Error connecting to source {src}: {str(e)}")


def _get_token() -> str:
    path = "token.md"
    if os.path.exists(path):
        with open(path, "r") as f:
            return f.read().strip()
    return "studio_admin_token_2026_xyz"

HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nishify Studio Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <style>
        body { background-color: #0f172a; color: #f8fafc; font-family: 'Inter', sans-serif; }
        .glass { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }
        .markdown-body h1 { font-size: 2em; font-weight: bold; margin-bottom: 0.5em; color: #60a5fa;}
        .markdown-body h2 { font-size: 1.5em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; color: #93c5fd;}
        .markdown-body ul { list-style-type: disc; margin-left: 2em; margin-bottom: 1em; }
        .markdown-body p { margin-bottom: 1em; line-height: 1.6; color: #cbd5e1; }
        .markdown-body pre { background: #1e293b; padding: 1em; border-radius: 8px; margin-bottom: 1em; overflow-x: auto;}
    </style>
</head>
<body class="min-h-screen p-8">

    <div id="app" class="max-w-[1400px] mx-auto space-y-6">
        
        <!-- Login Gate -->
        <div v-if="!isAuthenticated" class="max-w-md mx-auto mt-20 glass p-8 rounded-xl shadow-2xl">
            <h2 class="text-2xl font-bold text-center text-blue-400 mb-6">Nishify Studio Login</h2>
            <form @submit.prevent="login">
                <input type="password" v-model="loginToken" placeholder="Enter Access Token" class="w-full bg-slate-900 border border-slate-700 rounded p-3 text-white focus:border-blue-500 outline-none mb-4" />
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-all">Authenticate</button>
            </form>
            <p v-if="loginError" class="text-red-400 text-sm mt-3 text-center">{{ loginError }}</p>
        </div>

        <!-- Dashboard -->
        <div v-else class="space-y-8">
            <!-- Header -->
            <header class="flex justify-between items-center glass p-6 rounded-xl shadow-lg border-b-2 border-slate-700">
                <div>
                    <h1 class="text-3xl font-bold tracking-tight text-white mb-1">
                        Nishify <span class="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-500">Studio Orchestrator</span>
                    </h1>
                    <p class="text-xs text-slate-400 uppercase tracking-widest">"Everything is a Source" Live Monitor</p>
                </div>
                
                <div class="flex items-center space-x-8">
                    <div class="text-right">
                        <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold">Client Context</p>
                        <p class="font-bold text-emerald-400 text-lg">Pioneer Fresh</p>
                    </div>
                    <!-- Source selector -->
                    <div class="text-right pl-8 border-l border-slate-700">
                        <p class="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Router Destination</p>
                        <select v-model="activeSource" @change="changeSource" class="glass text-blue-300 font-bold p-2 px-4 rounded outline-none border cursor-pointer hover:border-blue-400 transition-colors">
                            <option value="memory">Dev InMemory</option>
                            <option value="postgres">PostgreSQL Docker</option>
                            <option value="elastic">ElasticSearch Docker</option>
                        </select>
                    </div>
                    <button @click="logout" class="bg-slate-800 hover:bg-red-600/80 transition-colors px-4 py-2 rounded text-sm text-slate-300 font-semibold border border-slate-700 hover:border-red-500 hover:text-white">Logout</button>
                </div>
            </header>

            <div class="grid grid-cols-12 gap-8">
                <!-- Sidebar -->
                <div class="col-span-3 glass p-6 rounded-xl h-fit sticky top-8">
                    <ul class="space-y-2 mb-8">
                        <li @click="showReadme = true; currentCollection = null" 
                            :class="['p-3 rounded cursor-pointer transition-all duration-200 font-medium', showReadme ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30' : 'hover:bg-slate-800 text-slate-300']">
                            📖 Documentation & README
                        </li>
                    </ul>
                    
                    <h3 class="text-xs uppercase tracking-widest font-bold mb-3 text-slate-500 border-b border-slate-700 pb-2">Collections</h3>
                    <ul class="space-y-1">
                        <li v-for="col in collections" :key="col" 
                            @click="selectCollection(col)"
                            class="flex items-center group cursor-pointer">
                            <div :class="['w-1 h-8 rounded-r mr-3 transition-all', currentCollection === col ? 'bg-blue-500' : 'bg-transparent group-hover:bg-slate-600']"></div>
                            <span :class="['p-2 rounded w-full transition-all duration-200 capitalize font-medium', currentCollection === col ? 'bg-blue-600/10 text-blue-400' : 'hover:bg-slate-800/50 text-slate-400']">
                                {{ col.replace('_', ' ') }}
                            </span>
                        </li>
                    </ul>
                </div>

                <!-- Main Display Area -->
                <div class="col-span-9 glass p-8 rounded-xl min-h-[600px] border border-slate-700/50 shadow-xl">
                    
                    <!-- Documentation View -->
                    <div v-if="showReadme" class="space-y-4">
                        <div class="flex space-x-2 border-b border-slate-700 pb-2 mb-6">
                            <button v-for="(html, filename) in markdowns" :key="filename" 
                                @click="activeDoc = filename"
                                :class="['px-4 py-2 font-semibold text-sm rounded transition-all', activeDoc === filename ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200']">
                                {{ filename }}
                            </button>
                        </div>
                        <div class="markdown-body p-6 glass rounded shadow-inner min-h-[500px]" v-html="markdowns[activeDoc]">
                        </div>
                    </div>
                    
                    <!-- Table View -->
                    <div v-else-if="currentCollection">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-2xl font-bold text-white capitalize flex items-center">
                                <span class="bg-blue-500/20 text-blue-400 w-10 h-10 rounded flex items-center justify-center mr-4 shadow-inner border border-blue-500/30">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
                                </span>
                                {{ currentCollection.replace('_', ' ') }}
                            </h2>
                            <button @click="showCreateForm = true" class="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-5 py-2.5 rounded shadow-lg transition-all font-semibold text-sm flex items-center">
                                <span class="text-lg mr-2 font-light">+</span> New Record
                            </button>
                        </div>

                        <div class="overflow-x-auto rounded border border-slate-700/50">
                            <table class="w-full text-left bg-slate-800/20">
                                <thead class="bg-slate-800 border-b border-slate-700 text-slate-300">
                                    <tr>
                                        <th v-for="key in tableKeys" :key="key" class="py-3 px-5 uppercase text-[10px] tracking-widest font-bold">{{ key }}</th>
                                        <th class="py-3 px-5 text-right uppercase text-[10px] tracking-widest font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in tableData" :key="item.id" class="border-b border-slate-800/50 hover:bg-slate-750/30 transition-colors">
                                        <td v-for="key in tableKeys" :key="key" class="py-3 px-5 font-mono text-sm text-slate-300">
                                            {{ item[key] || '-' }}
                                        </td>
                                        <td class="py-3 px-5 text-right space-x-4">
                                            <button @click="editItem(item)" class="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">Edit</button>
                                            <button @click="deleteItem(item.id)" class="text-red-400 hover:text-red-300 font-semibold text-sm transition-colors">Delete</button>
                                        </td>
                                    </tr>
                                    <tr v-if="tableData.length === 0">
                                        <td :colspan="tableKeys.length + 1" class="text-center py-12 text-slate-500 font-medium">No records found. Setup data in this source.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal for Editing/Creating -->
            <div v-if="showCreateForm" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div class="glass p-8 rounded-xl w-full max-w-lg shadow-2xl relative border border-slate-600">
                    <h3 class="text-2xl font-bold mb-6 text-white">{{ isEditing ? 'Edit' : 'Create' }} <span class="capitalize text-blue-400">{{ currentCollection.replace('_', ' ') }}</span></h3>
                    
                    <div class="space-y-5">
                        <div v-for="key in formKeys" :key="key">
                            <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">{{ key }}</label>
                            <input type="text" v-model="formData[key]" :disabled="isEditing && key==='id'" :class="[isEditing && key==='id' ? 'opacity-50 cursor-not-allowed bg-slate-800' : 'bg-slate-900 border border-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500', 'w-full rounded p-2.5 text-white outline-none transition-all font-mono text-sm shadow-inner']" />
                        </div>
                    </div>

                    <div class="mt-8 flex justify-end space-x-3">
                        <button @click="closeModal" class="px-5 py-2 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors text-sm font-semibold border border-slate-700">Cancel</button>
                        <button @click="saveForm" class="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded shadow-lg transition-all active:scale-95 font-semibold text-sm border border-blue-500/50">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>

    <script>
        const { createApp } = Vue

        createApp({
            data() {
                return {
                    isAuthenticated: false,
                    loginToken: '',
                    loginError: '',
                    expectedToken: '{{ expected_token }}',
                    
                    showReadme: true,
                    markdowns: {{ markdowns_json }},
                    activeDoc: 'prompt.md',
                    
                    activeSource: '{{ active_source }}',
                    systemLoading: false,

                    collections: ['warehouse', 'importer', 'retailer', 'smoke_company'],
                    currentCollection: null,
                    tableData: [],
                    tableKeys: [],
                    
                    showCreateForm: false,
                    isEditing: false,
                    formData: {},
                    formKeys: [],
                }
            },
            mounted() {
                const stored = localStorage.getItem('nishify_token');
                if (stored === this.expectedToken) {
                    this.isAuthenticated = true;
                }
            },
            methods: {
                login() {
                    if (this.loginToken === this.expectedToken) {
                        this.isAuthenticated = true;
                        localStorage.setItem('nishify_token', this.loginToken);
                        this.loginError = '';
                    } else {
                        this.loginError = 'Invalid access token.';
                    }
                },
                logout() {
                    localStorage.removeItem('nishify_token');
                    this.isAuthenticated = false;
                    this.loginToken = '';
                },
                async changeSource() {
                    try {
                        const res = await fetch('/set_source', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({source_name: this.activeSource})
                        });
                        if(!res.ok) {
                            const err = await res.json();
                            throw new Error(err.detail);
                        }
                        alert("Router Backend Swapped to: " + this.activeSource.toUpperCase());
                        if (this.currentCollection) await this.fetchData();
                    } catch (e) {
                         alert("Failed to connect: " + e.message);
                         // Revert select visually
                         this.activeSource = 'memory';
                    }
                },
                async selectCollection(col) {
                    this.showReadme = false;
                    this.currentCollection = col;
                    this.formData = {};
                    this.isEditing = false;
                    await this.fetchData();
                    this.guessSchema();
                },
                async fetchData() {
                    try {
                        const res = await fetch(`/entities/${this.currentCollection}`);
                        if(!res.ok) throw new Error("Could not fetch");
                        const json = await res.json();
                        this.tableData = json.items || [];
                    } catch (e) {
                        console.error("Fetch error", e);
                        this.tableData = [];
                    }
                },
                guessSchema() {
                    const dict = {
                        'warehouse': ['id', 'location', 'capacity'],
                        'importer': ['id', 'origin_country', 'license_number'],
                        'retailer': ['id', 'company_name', 'warehouse_id'],
                        'smoke_company': ['id', 'tax_id', 'audit_status', 'warehouse_id']
                    };
                    this.tableKeys = dict[this.currentCollection] || ['id'];
                    this.formKeys = dict[this.currentCollection] || ['id'];
                },
                closeModal() {
                    this.showCreateForm = false;
                    this.isEditing = false;
                    this.formData = {};
                },
                editItem(item) {
                    this.formData = { ...item };
                    this.isEditing = true;
                    this.showCreateForm = true;
                },
                async saveForm() {
                    if (!this.formData.id) return alert("ID is required!");

                    const method = this.isEditing ? 'PUT' : 'POST';
                    const url = this.isEditing ? `/entities/${this.currentCollection}/${this.formData.id}` : `/entities/${this.currentCollection}`;
                    
                    try {
                        const res = await fetch(url, {
                            method,
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: this.formData.id, data: this.formData })
                        });
                        if (!res.ok) throw new Error(await res.text());
                        
                        this.closeModal();
                        await this.fetchData();
                    } catch (e) {
                         alert("Error saving: " + e.message);
                    }
                },
                async deleteItem(id) {
                    if(!confirm(`Delete ${id}?`)) return;
                    try {
                         await fetch(`/entities/${this.currentCollection}/${id}`, { method: 'DELETE' });
                         await this.fetchData();
                    } catch (e) {
                        alert("Error deleting: " + e.message);
                    }
                }
            }
        }).mount('#app')
    </script>
</body>
</html>
"""

@ui_router.get("/", response_class=HTMLResponse, include_in_schema=False)
async def serve_admin_ui():
    """Serves the secure master dashboard, embedding Markdown docs and Router logic."""
    expected_token = _get_token()
    
    # Read core tracking files securely
    docs = {"prompt.md": "No prompt available", "task.md": "No tasks yet", "implementation_plan.md": "No plan defined", "README.md": "No readme"}
    markdowns_dict = {}
    
    for filename in docs.keys():
        if os.path.exists(filename):
            with open(filename, "r", encoding="utf-8") as f:
                mdtext = f.read()
                html = markdown.markdown(mdtext)
                markdowns_dict[filename] = html
        else:
            markdowns_dict[filename] = f"<p class='text-slate-400 italic'>[{filename}] has not been generated yet.</p>"

    # Ensure valid JSON injection for Vue 3 using json.dumps
    import json
    markdowns_json = json.dumps(markdowns_dict)

    content = HTML_TEMPLATE.replace('{{ expected_token }}', expected_token) \
                           .replace('{{ markdowns_json }}', markdowns_json) \
                           .replace('{{ active_source }}', _active_source_name)
                           
    return HTMLResponse(content=content)
