import os
import re
from typing import List, Tuple

def extract_code_from_file(file_path: str) -> str:
    """
    Extracts and returns the code from a given file.
    """
    with open(file_path, 'r') as file:
        return file.read()

def filter_code_files(file_paths: List[str]) -> List[str]:
    """
    Filters out non-code files from a list of file paths.
    """
    code_file_extensions = ('.py', '.js', '.java', '.cpp', '.cs', '.ts', '.html', '.css', '.scss')
    return [file_path for file_path in file_paths if file_path.endswith(code_file_extensions)]

def normalize_code_structure(code: str) -> str:
    """
    Normalizes the code structure by removing unnecessary whitespaces and standardizing indentation.
    """
    # Remove leading and trailing whitespaces
    code = code.strip()
    # Standardize indentation to 4 spaces
    code = re.sub(r'\t', '    ', code)
    # Remove excessive blank lines
    code = re.sub(r'\n\s*\n', '\n\n', code)
    return code

def preprocess_codebase(directory_path: str) -> Tuple[List[str], List[str]]:
    """
    Preprocesses the codebase by extracting code from files, filtering non-code files,
    and normalizing the code structure.
    """
    # Walk through the directory and get all file paths
    all_file_paths = [os.path.join(root, file) for root, _, files in os.walk(directory_path) for file in files]
    # Filter out non-code files
    code_file_paths = filter_code_files(all_file_paths)
    # Read and preprocess code from each file
    preprocessed_code = [normalize_code_structure(extract_code_from_file(file_path)) for file_path in code_file_paths]
    return code_file_paths, preprocessed_code

# Example usage:
# code_paths, preprocessed_code = preprocess_codebase('/path/to/codebase')
# Now, code_paths contains paths to code files, and preprocessed_code contains the preprocessed code strings.