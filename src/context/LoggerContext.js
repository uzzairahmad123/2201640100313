import React, { createContext, useContext } from 'react';

const LoggerContext = createContext();

function getLogs() {
  try {
    return JSON.parse(localStorage.getItem('logs') || '[]');
  } catch {
    return [];
  }
}

function setLogs(next) {
  localStorage.setItem('logs', JSON.stringify(next));
}

export const LoggerProvider = ({ children }) => {
  const logEvent = (message, data = {}) => {
    const entry = { message, data, t: new Date().toISOString() };
    const next = [...getLogs(), entry];
    setLogs(next);
  };

  const api = {
    logEvent,
    getLogs,
    clearLogs: () => setLogs([]),
  };

  return <LoggerContext.Provider value={api}>{children}</LoggerContext.Provider>;
};

export const useLogger = () => useContext(LoggerContext);
