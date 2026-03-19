import Keycloak from "keycloak-js";
export const keycloak = new Keycloak({
  url: "https://<your-keycloak-host>/",
  realm: "<your-realm>",
  clientId: "<your-client-id>",
});

keycloak.init({ onLoad: "login-required" });
