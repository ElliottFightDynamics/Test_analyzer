import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Dense, LSTM, Embedding
from tensorflow.keras.optimizers import Adam

class DocPredictor(Model):
    def __init__(self, vocab_size, embedding_dim, lstm_units, output_dim):
        super(DocPredictor, self).__init__()
        self.embedding = Embedding(input_dim=vocab_size, output_dim=embedding_dim)
        self.lstm = LSTM(lstm_units, return_sequences=False)
        self.dense = Dense(output_dim, activation='softmax')

    def call(self, inputs):
        x = self.embedding(inputs)
        x = self.lstm(x)
        return self.dense(x)

    def compile_model(self, learning_rate):
        self.compile(optimizer=Adam(learning_rate=learning_rate),
                     loss='categorical_crossentropy',
                     metrics=['accuracy'])

    def train_model(self, train_data, validation_data, epochs, batch_size):
        return self.fit(train_data, validation_data=validation_data, epochs=epochs, batch_size=batch_size)

def create_doc_predictor_model(vocab_size, embedding_dim=128, lstm_units=256, output_dim=512, learning_rate=0.001):
    model = DocPredictor(vocab_size, embedding_dim, lstm_units, output_dim)
    model.compile_model(learning_rate)
    return model

# Assuming the existence of a prepared dataset with vectorized code and corresponding documentation
# The following lines are placeholders for dataset loading and model training
# Replace with actual dataset loading and preprocessing logic

# Load dataset
# train_dataset, val_dataset = load_dataset()

# Create and train the model
# doc_predictor = create_doc_predictor_model(vocab_size=len(tokenizer.word_index) + 1)
# history = doc_predictor.train_model(train_dataset, val_dataset, epochs=10, batch_size=32)

# Save the trained model
# doc_predictor.save('path_to_save_model/doc_predictor_model')