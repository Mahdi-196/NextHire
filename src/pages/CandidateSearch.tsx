import { useState, useEffect } from "react";
import axios from "axios";
import "../CandidateSearch.css";

interface Candidate {
  login: string;
  name: string;
  location: string;
  avatar_url: string;
  email: string | null;
  html_url: string;
  company: string | null;
}

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCandidate();
  }, []);

  const fetchCandidate = async () => {
    setLoading(true);
    setError("");

    try {
      const usersResponse = await axios.get(
        `https://api.github.com/users?since=${Math.floor(Math.random() * 10000)}`,
        {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        }
      );

      const users = usersResponse.data;
      if (users.length > 0) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const userDetailsResponse = await axios.get(randomUser.url, {
          headers: {
            Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
          },
        });

        setCandidate(userDetailsResponse.data);
      } else {
        setError("No candidates found.");
      }
    } catch (err) {
      setError("Failed to fetch candidate");
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (candidate) {
      const savedCandidates = JSON.parse(
        localStorage.getItem("savedCandidates") || "[]"
      );
      savedCandidates.push(candidate);
      localStorage.setItem("savedCandidates", JSON.stringify(savedCandidates));
    }
    fetchCandidate();
  };

  return (
    <div className="candidate-search-container">
      <div className="header">Candidate Search</div>

      {loading && <p>Loading candidate...</p>}
      {error && <p>{error}</p>}

      {candidate && (
        <div className="candidate-card">
          <img src={candidate.avatar_url} alt={candidate.name} />
          <h2>{candidate.name || candidate.login}</h2>
          <p>Location: {candidate.location || "N/A"}</p>
          <p>Email: {candidate.email || "N/A"}</p>
          <p>Company: {candidate.company || "N/A"}</p>
          <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>

          <div className="buttons">
            <button className="accept-btn" onClick={saveCandidate}>+</button>
            <button className="reject-btn" onClick={fetchCandidate}>-</button>
          </div>
        </div>
      )}

      {!loading && !candidate && <p>No more candidates available.</p>}
    </div>
  );
};

export default CandidateSearch;
