let workTimerInterval = null;
let breakTimerInterval = null;
let workTimeLeft;
let breakTimeLeft;

self.onmessage = function(e) {
  const { command, type, time } = e.data;

  if (type === 'work') {
    if (command === 'start') {
      if (!workTimerInterval) {
        workTimeLeft = time;
        workTimerInterval = setInterval(() => {
          if (workTimeLeft > 0) {
            workTimeLeft--;
            self.postMessage({ type: 'work', time: workTimeLeft });
          } else {
            clearInterval(workTimerInterval);
            workTimerInterval = null;
          }
        }, 1000);
      }
    } else if (command === 'pause') {
      clearInterval(workTimerInterval);
      workTimerInterval = null;
    } else if (command === 'reset') {
      clearInterval(workTimerInterval);
      workTimerInterval = null;
    }
  } else if (type === 'break') {
    if (command === 'start') {
      if (!breakTimerInterval) {
        breakTimeLeft = time;
        breakTimerInterval = setInterval(() => {
          if (breakTimeLeft > 0) {
            breakTimeLeft--;
            self.postMessage({ type: 'break', time: breakTimeLeft });
          } else {
            clearInterval(breakTimerInterval);
            breakTimerInterval = null;
          }
        }, 1000);
      }
    } else if (command === 'pause') {
      clearInterval(breakTimerInterval);
      breakTimerInterval = null;
    } else if (command === 'reset') {
      clearInterval(breakTimerInterval);
      breakTimerInterval = null;
    }
  }
};