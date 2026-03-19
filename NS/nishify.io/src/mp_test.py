# mp_test.py
from multiprocessing import Pool

def work(x):
    return x * x

if __name__ == "__main__":
    with Pool(4) as p:
        print(p.map(work, range(10)))
