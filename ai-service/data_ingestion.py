import pymongo
import datetime
import random

MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "futureproof"
COLLECTION_NAME = "jobs"

def scrape_job_boards():
    """
    Simulates fetching payloads from LinkedIn/Indeed APIs.
    In a true production environment, we would use BeautifulSoup or official API SDKs here.
    """
    print('Starting simulated LinkedIn job scrape...')
    
    mock_payloads = []
    
    titles = ['Machine Learning Engineer', 'Senior React Developer', 'DevOps Specialist', 'Data Scientist', 'Fullstack Software Engineer']
    sources = ['LinkedIn', 'Indeed', 'Glassdoor']
    
    # Generate 50 mock jobs matching our target domains
    for _ in range(50):
        t = random.choice(titles)
        if "React" in t or "Fullstack" in t:
            sk = random.sample(['react', 'javascript', 'typescript', 'node.js', 'sql', 'express', 'css'], k=random.randint(3, 5))
            sal = random.randint(80000, 140000)
        elif "Machine" in t or "Data" in t:
            sk = random.sample(['python', 'tensorflow', 'sql', 'pytorch', 'mlops', 'langchain', 'pandas'], k=random.randint(3, 5))
            sal = random.randint(110000, 170000)
        else:
            sk = random.sample(['kubernetes', 'docker', 'aws', 'terraform', 'python', 'bash'], k=random.randint(3, 5))
            sal = random.randint(100000, 160000)
            
        job = {
            "title": t,
            "company": f"TechCorp {random.randint(1, 100)}",
            "location": "Remote",
            "skills_required": sk,
            "salary_min": sal - 15000,
            "salary_max": sal + 15000,
            "date_posted": datetime.datetime.now() - datetime.timedelta(days=random.randint(0, 30)),
            "source": random.choice(sources)
        }
        mock_payloads.append(job)
        
    return mock_payloads

def ingest_data():
    """Connects to Mongo and bulk-inserts fetched payloads."""
    print(f'Attempting connection to {MONGO_URI}...')
    try:
        client = pymongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        client.server_info() # trigger connection verification
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        
        jobs = scrape_job_boards()
        if jobs:
            result = collection.insert_many(jobs)
            print(f"Successfully ingested {len(result.inserted_ids)} job postings into '{DB_NAME}.{COLLECTION_NAME}'.")
        else:
            print("No jobs found to ingest.")
            
    except pymongo.errors.ServerSelectionTimeoutError:
        print("Warning: MongoDB server not responding. Ensure your local mongod is running!")
    except Exception as e:
        print(f"Ingestion Error: {e}")

if __name__ == '__main__':
    ingest_data()
