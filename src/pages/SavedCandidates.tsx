import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import "../index.css";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      try {
        const parsedCandidates: Candidate[] = JSON.parse(storedCandidates);
        setSavedCandidates(
          Array.isArray(parsedCandidates) ? parsedCandidates : []
        );
      } catch (error) {
        console.error("Error parsing saved candidates:", error);
        setSavedCandidates([]);
      }
    }
  }, []);

  const removeCandidate = (html_url: string) => {
    console.log("Removing:", html_url);

    if (!html_url) {
      console.error("Error: Candidate HTML URL is undefined!");
      return;
    }

    const updatedCandidates = savedCandidates.filter(
      (candidate) => candidate.html_url !== html_url
    );
    console.log("Updated List:", updatedCandidates);

    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div className="saved-candidates-container">
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="candidate-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate) => (
              <tr key={candidate.username}>
                <td>
                  <img
                    src={candidate.avatar_url}
                    alt={candidate.name || candidate.username}
                    className="candidate-avatar"
                  />
                </td>
                <td>
                  <strong>{candidate.name}</strong>{" "}
                  <i>({candidate.username})</i>
                </td>
                <td>{candidate.location || "N/A"}</td>
                <td>
                  <a href={`mailto:${candidate.email}`}>
                    {candidate.email || "N/A"}
                  </a>
                </td>
                <td>{candidate.company || "N/A"}</td>
                <td>
                  {candidate.html_url ? (
                    <a
                      href={candidate.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub Profile
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>
                  <button
                    onClick={() => removeCandidate(candidate.html_url)}
                    className="reject-btn"
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No candidates have been accepted.</p>
      )}
    </div>
  );
};

export default SavedCandidates;
