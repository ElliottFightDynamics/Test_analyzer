import unittest
from ai.models.code2vec import Code2VecModel
from ai.models.doc_predictor import DocumentationPredictionModel

class TestCode2VecModel(unittest.TestCase):
    def setUp(self):
        self.model = Code2VecModel()

    def test_vectorize_code(self):
        sample_code = "def add(a, b): return a + b"
        vector = self.model.vectorize_code(sample_code)
        self.assertIsNotNone(vector)
        self.assertTrue(len(vector) > 0)

class TestDocumentationPredictionModel(unittest.TestCase):
    def setUp(self):
        self.model = DocumentationPredictionModel()

    def test_predict_documentation(self):
        sample_vector = [0.1, -0.2, 0.3]  # Example vector representation of code
        documentation = self.model.predict_documentation(sample_vector)
        self.assertIsNotNone(documentation)
        self.assertIsInstance(documentation, str)

if __name__ == '__main__':
    unittest.main()