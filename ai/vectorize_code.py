import os
import numpy as np
from gensim.models import Word2Vec
from ai.models.code2vec import Code2Vec
from ai.utils.preprocessing import tokenize_code

class CodeVectorizer:
    def __init__(self, model_path='models/word2vec.model'):
        if os.path.exists(model_path):
            self.model = Word2Vec.load(model_path)
        else:
            self.model = None

    def train_model(self, sentences, vector_size=100, window=5, min_count=1, workers=4):
        self.model = Word2Vec(sentences, vector_size=vector_size, window=window, min_count=min_count, workers=workers)
        self.model.save('models/word2vec.model')

    def vectorize(self, code):
        tokens = tokenize_code(code)
        vectors = [self.model.wv[token] for token in tokens if token in self.model.wv]
        return np.mean(vectors, axis=0) if vectors else np.zeros(self.model.vector_size)

    def save_model(self, path='models/word2vec.model'):
        if self.model:
            self.model.save(path)

    def load_model(self, path='models/word2vec.model'):
        if os.path.exists(path):
            self.model = Word2Vec.load(path)
        else:
            raise FileNotFoundError(f"The specified model path {path} does not exist.")

if __name__ == "__main__":
    # Example usage:
    # Load the model or train if not present
    vectorizer = CodeVectorizer()
    try:
        vectorizer.load_model()
    except FileNotFoundError:
        # Assume we have a list of tokenized sentences from the codebase
        code_sentences = [['def', 'foo', ':', 'pass'], ['import', 'numpy', 'as', 'np']]
        vectorizer.train_model(code_sentences)

    # Vectorize a piece of code
    sample_code = "def foo():\n    pass"
    code_vector = vectorizer.vectorize(sample_code)
    print(code_vector)