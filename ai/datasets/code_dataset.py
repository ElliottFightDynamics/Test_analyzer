import os
import torch
from torch.utils.data import Dataset

class CodeDataset(Dataset):
    def __init__(self, code_directory, tokenizer, max_length):
        self.tokenizer = tokenizer
        self.max_length = max_length
        self.code_samples = []
        self._build_dataset(code_directory)

    def _build_dataset(self, code_directory):
        for root, dirs, files in os.walk(code_directory):
            for file in files:
                if file.endswith('.py'):  # Assuming we are focusing on Python codebases
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', encoding='utf-8') as code_file:
                        code = code_file.read()
                        self.code_samples.append(code)

    def __len__(self):
        return len(self.code_samples)

    def __getitem__(self, idx):
        code = self.code_samples[idx]
        encoded_code = self.tokenizer.encode_plus(
            code,
            add_special_tokens=True,
            max_length=self.max_length,
            return_token_type_ids=False,
            padding='max_length',
            truncation=True,
            return_attention_mask=True,
            return_tensors='pt'
        )
        input_ids = encoded_code['input_ids'].flatten()
        attention_mask = encoded_code['attention_mask'].flatten()

        return {
            'input_ids': input_ids,
            'attention_mask': attention_mask
        }