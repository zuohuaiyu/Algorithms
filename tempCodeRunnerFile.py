 for vector in enumerate(file):
        node_num = int(vector[1][0])
        vector = np.array(vector[1][1:])
        vectors[node_num] = vector
    # print (vectors)