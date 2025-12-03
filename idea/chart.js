document.addEventListener('DOMContentLoaded', function () {
  // Labels for the X axis
  const labels = Array.from({ length: 11 }, (_, i) => i);

  // Parameters for the 10 parallel straight lines
  const lineCount = 10;
  const base = 10; // first line y-value
  const gap = 10; // vertical gap between lines

  // A simple color palette for the lines
  const palette = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
  ];
  const whiteColor= '#fff';

  // Build datasets: each dataset is a horizontal straight line
  const datasets = Array.from({ length: lineCount }, (_, i) => {
    const y = base + i * gap;
    return {
      label: `Line ${i + 1}`,
      data: labels.map(() => y),
      borderColor: whiteColor,
      borderWidth: 2,
      tension: 0.2, // slight curve
      pointRadius: 3,
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      fill: false,
    };
  });

  // Create the Chart
  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { title: { display: true, text: 'X' } },
        y: {
          min: 0,
          max: base + (lineCount - 1) * gap + 10,
          title: { display: true, text: 'Y' }
        }
      }
    }
  });
});
