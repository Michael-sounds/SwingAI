const alertedSweeps = new Set();

function hasAlerted(key) {
  return alertedSweeps.has(key);
}

function markAlerted(key) {
  alertedSweeps.add(key);

  // Auto-remove after 1 hour
  setTimeout(() => {
    alertedSweeps.delete(key);
  }, 60 * 60 * 1000);
}

module.exports = {
  hasAlerted,
  markAlerted,
};