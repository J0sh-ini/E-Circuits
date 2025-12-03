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
  const whiteColor = '#fff';

  // Build datasets: each dataset is a horizontal straight line
  const datasets = Array.from({ length: lineCount }, (_, i) => {
    const y = base + i * gap;
    return {
      label: `Line ${i + 1}`,
      data: labels.map(() => y),
      borderColor: whiteColor,
      borderWidth: 2,
      tension: 0.2,
      pointRadius: 3,
      pointBackgroundColor: '#000',
      pointBorderColor: '#000',
      fill: false,
    };
  });

  // Plugin that draws a red connector between two selected points
  const connectorPlugin = {
    id: 'connectorPlugin',
    afterDatasetsDraw(chart) {
      const sel = chart._selectedPoints || [];
      if (sel.length === 2) {
        const ctx = chart.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.moveTo(sel[0].x, sel[0].y);
        ctx.lineTo(sel[1].x, sel[1].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  // Create the Chart and store the instance
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
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
    },
    plugins: [connectorPlugin]
  });

  // Track selected points (maximum two). Clicking toggles selection.
  const canvas = document.getElementById('myChart');
  let selected = [];
  canvas.addEventListener('click', function (evt) {
    const points = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
    if (!points.length) return;
    const el = points[0];
    const meta = myChart.getDatasetMeta(el.datasetIndex);
    const pt = meta.data[el.index];
    const coords = { x: pt.x, y: pt.y, datasetIndex: el.datasetIndex, index: el.index };

    // If already selected, remove it
    const exists = selected.findIndex(s => s.datasetIndex === coords.datasetIndex && s.index === coords.index);
    if (exists !== -1) {
      selected.splice(exists, 1);
    } else {
      selected.push(coords);
      if (selected.length > 2) selected.shift();
    }

    myChart._selectedPoints = selected;
    myChart.update();
  });
});
