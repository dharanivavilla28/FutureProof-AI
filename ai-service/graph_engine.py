import networkx as nx

# Initial Graph definition simulating job description co-occurrences
# In production, this edge list would be dynamically created from the job data in MongoDB
edges = [
    ("python", "tensorflow"), ("python", "mlops"), ("python", "sql"),
    ("react", "typescript"), ("docker", "kubernetes"), ("aws", "kubernetes"),
    ("langchain", "python"), ("tensorflow", "mlops"), ("mlops", "kubernetes"),
    ("sql", "aws"), ("typescript", "node.js"), ("react", "node.js")
]

G = nx.Graph()
G.add_edges_from(edges)

def compute_subgraph(core_skills: list = None) -> dict:
    """Analyze the skill network and compute centrality metrics."""
    # Compute metrics
    pagerank = nx.pagerank(G)
    betweenness = nx.betweenness_centrality(G)
    
    # Identify bridge skills
    bridge_skills = [node for node, score in betweenness.items() if score > 0.15]
    
    nodes = []
    _edges = []
    
    for n in G.nodes():
        nodes.append({
            "id": n,
            "demand": int(pagerank[n] * 1000), # Mock demand scaling based on PageRank
            "category": "ai" if n in ["tensorflow", "langchain", "mlops"] else "devops" if n in ["docker", "kubernetes", "aws"] else "language"
        })
        
    for u, v in G.edges():
        _edges.append({"source": u, "target": v})
        
    return {
        "nodes": nodes,
        "edges": _edges,
        "bridgeSkills": bridge_skills
    }

def shortest_path(current_skills: list, target_role_skill: str) -> dict:
    """Uses shortest path algorithm over the skill synergy graph to find an optimal roadmap."""
    if not current_skills:
        return {"error": "Provide at least one current skill"}
        
    best_path = []
    shortest_len = float('inf')
    
    for start in current_skills:
        start_lower = start.lower()
        target_lower = target_role_skill.lower()
        if start_lower in G and target_lower in G:
            try:
                path = nx.shortest_path(G, source=start_lower, target=target_lower)
                if len(path) < shortest_len:
                    shortest_len = len(path)
                    best_path = path
            except nx.NetworkXNoPath:
                pass
                
    return {
        "target": target_role_skill,
        "path": best_path[1:] if best_path else ["Learn core fundamentals first"],
        "estimated_months": len(best_path) * 2 if best_path else 12
    }
