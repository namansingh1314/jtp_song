import os



base_dir = os.path.dirname(__file__)
project_root = os.path.abspath(os.path.join(base_dir, '..', '..'))
csv_file = os.path.join(project_root, 'backend', 'dataset', 'songs.csv')
model_file = os.path.join(project_root, 'backend', 'app', 'trained_recommender.pkl')


if __name__ == '__main__':
    print(f"Dataset: {csv_file}")
    print(f"Model: {model_file}")
