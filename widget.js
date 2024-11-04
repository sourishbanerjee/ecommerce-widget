(function() {
    class EcommerceWidget {
        constructor(config) {
            this.config = config;
            this.init();
        }

        init() {
            // First, make sure we're in the top window
            if (window.top !== window) {
                // If we're in an iframe, send message to parent
                window.parent.postMessage({
                    type: 'CREATE_WIDGET',
                    config: this.config
                }, '*');
                return;
            }
            this.injectStyles();
            this.createWidget();
            this.setupEventListeners();
        }

        injectStyles() {
            const styles = `
                .ea-widget-container {
                    position: fixed !important;
                    bottom: 20px !important;
                    right: 20px !important;
                    z-index: 999999 !important;
                    font-family: system-ui, -apple-system, sans-serif !important;
                }
                .ea-widget-button {
                    width: 60px !important;
                    height: 60px !important;
                    border-radius: 50% !important;
                    background-color: ${this.config.primaryColor || '#24573F'} !important;
                    color: white !important;
                    border: none !important;
                    cursor: pointer !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        createWidget() {
            console.log('Creating widget with config:', this.config);
            // Create main container
            const container = document.createElement('div');
            container.className = 'ea-widget-container';
            
            // Create widget button
            const button = document.createElement('button');
            button.className = 'ea-widget-button';
            button.innerHTML = '💬';
            
            container.appendChild(button);
            document.body.appendChild(container);
            
            console.log('Widget created!');
        }

        setupEventListeners() {
            // Add event listeners
        }
    }

    // Make it globally available
    window.initEcomWidget = function(config) {
        console.log('Initializing widget with config:', config);
        return new EcommerceWidget(config);
    };
})();
