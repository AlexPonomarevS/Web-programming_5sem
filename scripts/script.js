(function() {
    window.addEventListener('load', function() {
        var loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.domContentLoadedEventStart;
        document.getElementById('loadTime').textContent = 'Страница загружена за ' + loadTime + ' мс';
    });
})();