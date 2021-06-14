import tensorflow.keras as kr

def createModel():
    model = kr.Sequential()

    model.add(kr.layers.Dense(3,activation="relu"))
    model.add(kr.layers.Dense(9,activation="relu"))
    model.add(kr.layers.Dense(1,activation="sigmoid"))

    model.compile(loss="mse", optimizer=kr.optimizers.SGD(lr=0.01), metrics="acc")

    model.fit(X,Y, epochs=250)