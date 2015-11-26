google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
        var today = new Date()
        var data = google.visualization.arrayToDataTable([
          ['Language', 'Months Experience'],
          ['Python',  8],
          ['Ruby',  2],
          ['Javascript', 5],
          ['C#', 1]
        ]);

      var options = {
        legend: 'none',
        pieSliceText: 'label',
        height: 300,
        // title: 'Swiss Language Use (100 degree rotation)',
        pieStartAngle: 100,
      };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }
