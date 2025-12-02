import React, { useEffect, useState } from "react";

const isChromeExtensionEnv = typeof chrome !== "undefined" && !!chrome.storage?.sync;

export const OptionsApp: React.FC = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isChromeExtensionEnv) return;

    chrome.storage.sync.get(["userName"], (res: { userName?: string }) => {
      if (res.userName) setName(res.userName);
    });
  }, []);

  const handleSave = () => {
    if (!isChromeExtensionEnv) return;
    chrome.storage.sync.set({ userName: name.trim() || "" }, () => {
      setStatus("저장되었습니다.");
      setTimeout(() => setStatus(""), 1500);
    });
  };

  return (
    <div className="options-root">
      <h1>My Momentum 설정</h1>
      <div className="options-row">
        <label htmlFor="name">이름</label>
        <input
          id="name"
          className="options-input"
          value={name}
          placeholder="예: 상진"
          onChange={(e) => setName(e.target.value)}
        />
        <button className="options-button" onClick={handleSave}>
          저장
        </button>
      </div>
      {status && <div className="options-status">{status}</div>}
    </div>
  );
};
