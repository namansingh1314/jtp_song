import os

# Figure out where the script is running and backtrack to project root
base_dir = os.path.dirname(__file__)
project_root = os.path.abspath(os.path.join(base_dir, '..', '..'))

# Define paths we'll need later
csv_file = os.path.join(project_root, 'backend', 'dataset', 'songs.csv')
model_file = os.path.join(project_root, 'backend', 'app', 'trained_recommender.pkl')

# Sanity check: print paths if running as a script
if __name__ == '__main__':
    print(f"Dataset: {csv_file}")
    print(f"Model: {model_file}")
