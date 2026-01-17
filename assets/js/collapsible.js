// Collapsible sections
(function() {
    const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
    
    collapsibleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.closest('.collapsible-item');
            
            // Toggle expanded class
            item.classList.toggle('expanded');
        });
    });
})();
