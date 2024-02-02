import os
import torch
from transformers import pipeline
from ai.models.doc_predictor import DocumentationPredictor
from ai.utils.preprocessing import preprocess_code

class DocumentationGenerator:
    def __init__(self, model_path='ai/models/doc_predictor.py', tokenizer_path='ai/models/code2vec.py'):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = DocumentationPredictor.load_from_checkpoint(model_path).to(self.device)
        self.tokenizer = torch.load(tokenizer_path)
        self.summarizer = pipeline("summarization", model=self.model, tokenizer=self.tokenizer, device=0 if torch.cuda.is_available() else -1)

    def generate_documentation(self, code):
        """
        Generate documentation for a given piece of code.
        :param code: str, source code to document.
        :return: str, generated documentation.
        """
        preprocessed_code = preprocess_code(code)
        summary = self.summarizer(preprocessed_code, max_length=512, min_length=5, length_penalty=2.0, num_beams=4, early_stopping=True)
        return summary[0]['summary_text']

# Example usage:
if __name__ == "__main__":
    generator = DocumentationGenerator()
    code_snippet = """
    def add(a, b):
        return a + b
    """
    documentation = generator.generate_documentation(code_snippet)
    print(documentation)