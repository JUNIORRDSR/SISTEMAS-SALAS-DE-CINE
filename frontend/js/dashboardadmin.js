// Animación suave para las estadísticas
        document.addEventListener('DOMContentLoaded', function() {
            const statValues = document.querySelectorAll('.stat-value');
            
            statValues.forEach(stat => {
                const finalValue = stat.textContent;
                const isPrice = finalValue.includes('$');
                const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
                
                let currentValue = 0;
                const increment = Math.ceil(numericValue / 50);
                const duration = 1000;
                const stepTime = duration / (numericValue / increment);
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(counter);
                    }
                    
                    if (isPrice) {
                        stat.textContent = '$' + currentValue.toLocaleString();
                    } else {
                        stat.textContent = currentValue.toLocaleString();
                    }
                }, stepTime);
            });

            // Interactividad de los items de acción
            const actionItems = document.querySelectorAll('.action-item');
            actionItems.forEach(item => {
                item.addEventListener('click', function() {
                    const actionText = this.querySelector('.action-text').textContent;
                    console.log('Acción seleccionada:', actionText);
                    // Aquí puedes agregar la funcionalidad específica para cada acción
                });
            });

            // Navegación del sidebar
            const menuLinks = document.querySelectorAll('.sidebar-menu a');
            menuLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    menuLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    const sectionName = this.querySelector('.menu-icon + text, span:not(.menu-icon):not(.badge-cajero)').textContent;
                    console.log('Navegando a:', this.textContent.trim());
                });
            });
        });