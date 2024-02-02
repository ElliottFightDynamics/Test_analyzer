import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from ai.utils.preprocessing import tokenize_code, build_vocab

class Code2VecDataset(Dataset):
    def __init__(self, code_dataset, vocab, context_size=4):
        self.code_dataset = code_dataset
        self.vocab = vocab
        self.context_size = context_size

    def __len__(self):
        return len(self.code_dataset)

    def __getitem__(self, idx):
        tokenized_code = tokenize_code(self.code_dataset[idx])
        contexts = []
        for i in range(self.context_size, len(tokenized_code) - self.context_size):
            context = [tokenized_code[j] for j in range(i - self.context_size, i + self.context_size + 1) if j != i]
            target = tokenized_code[i]
            contexts.append((context, target))
        return contexts

class Code2Vec(nn.Module):
    def __init__(self, vocab_size, embedding_dim):
        super(Code2Vec, self).__init__()
        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
        self.linear1 = nn.Linear(context_size * 2 * embedding_dim, 128)
        self.linear2 = nn.Linear(128, vocab_size)

    def forward(self, inputs):
        embeds = self.embeddings(inputs).view((1, -1))
        out = torch.relu(self.linear1(embeds))
        out = self.linear2(out)
        log_probs = torch.log_softmax(out, dim=1)
        return log_probs

def train_code2vec_model(code_dataset, context_size=4, embedding_dim=100, epochs=10, batch_size=16, learning_rate=0.001):
    vocab = build_vocab(code_dataset)
    vocab_size = len(vocab)
    
    code2vec_dataset = Code2VecDataset(code_dataset, vocab, context_size)
    dataloader = DataLoader(code2vec_dataset, batch_size=batch_size, shuffle=True)

    model = Code2Vec(vocab_size, embedding_dim)
    loss_function = nn.NLLLoss()
    optimizer = optim.SGD(model.parameters(), lr=learning_rate)

    for epoch in range(epochs):
        total_loss = 0
        for context, target in dataloader:
            context_idxs = torch.tensor([[vocab[w] for w in ctx] for ctx in context], dtype=torch.long)
            model.zero_grad()
            log_probs = model(context_idxs)
            loss = loss_function(log_probs, torch.tensor([vocab[target]], dtype=torch.long))
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
        print(f'Epoch {epoch}: Total Loss {total_loss}')
    return model

# Example usage:
# code_dataset = ['def foo():', '    return bar']
# model = train_code2vec_model(code_dataset)