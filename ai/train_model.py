import os
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Embedding
from tensorflow.keras.callbacks import EarlyStopping
from ai.datasets.code_dataset import CodeDataset
from ai.models.code2vec import Code2Vec
from ai.utils.preprocessing import preprocess_code

# Load and preprocess the dataset
dataset_path = 'path/to/dataset'
code_dataset = CodeDataset(dataset_path)
data, labels = code_dataset.load_data()

# Preprocess the code snippets
preprocessed_data = [preprocess_code(code) for code in data]

# Convert code to vectors
code2vec = Code2Vec()
vectorized_data = code2vec.fit_transform(preprocessed_data)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(vectorized_data, labels, test_size=0.2, random_state=42)

# Define the model architecture
model = Sequential()
model.add(Embedding(input_dim=code2vec.vocab_size, output_dim=128, input_length=code2vec.max_code_length))
model.add(LSTM(64, return_sequences=True))
model.add(LSTM(32))
model.add(Dense(16, activation='relu'))
model.add(Dense(len(code_dataset.label_map), activation='softmax'))

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Define early stopping
early_stopping = EarlyStopping(monitor='val_loss', patience=3, verbose=1)

# Train the model
model.fit(X_train, y_train, validation_data=(X_test, y_test), epochs=10, batch_size=32, callbacks=[early_stopping])

# Evaluate the model
loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f'Test Accuracy: {accuracy * 100:.2f}%')

# Generate a classification report
y_pred = model.predict(X_test, batch_size=32)
print(classification_report(y_test.argmax(axis=1), y_pred.argmax(axis=1), target_names=code_dataset.label_map.keys()))

# Save the model
model.save('path/to/save/model')

# Save the code2vec instance for later use in vectorization
code2vec.save('path/to/save/code2vec_instance')

print('Training complete. Model and code2vec instance saved.')