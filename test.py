import numpy as np
import pandas as pd
def read_Emb(path_emb):
    file = np.loadtxt(path_emb, dtype='float', skiprows=(1))
    vectors = np.zeros((len(file) + 1, file[0].size - 1))
    for vector in enumerate(file):
        node_num = int(vector[1][0])
        vector = vector[1][1:]
        vectors[node_num] = vector
    return vectors

path_emb = 'C:/Users/Azuo/OneDrive/Develop/Experiment/mine/dataset/emb/karate/karate-0.3-0.emb'
vectors = read_Emb(path_emb)
df = pd.DataFrame(vectors).T.fillna(0)

print (df)