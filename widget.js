(function() {
    class EcommerceWidget {
        constructor(config) {
            this.config = config;
            this.init();
        }

        init() {
            this.injectStyles();
            this.createWidget();
            this.setupEventListeners();
        }

        injectStyles() {
            const styles = `
                .ea-widget-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 999999;
                    font-family: system-ui, -apple-system, sans-serif;
                }
                .ea-widget-button {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background-color: ${this.config.primaryColor || '#24573F'};
                    color: white;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                .ea-chat-container {
                    position: fixed;
                    bottom: 100px;
                    right: 20px;
                    width: 380px;
                    height: 600px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
                    display: none;
                }
                .ea-chat-container.active {
                    display: block;
                }
            `;
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        createWidget() {
            // Create main container
            const container = document.createElement('div');
            container.className = 'ea-widget-container';
            
            // Create widget button
            const button = document.createElement('button');
            button.className = 'ea-widget-button';
            button.innerHTML = '💬';
            
            // Create chat container
            const chat = document.createElement('div');
            chat.className = 'ea-chat-container';
            chat.innerHTML = `
                <h3>${this.config.companyName || 'Chat'}</h3>
                <div>This is a test chat widget</div>
            `;
            
            // Append elements
            container.appendChild(button);
            container.appendChild(chat);
            document.body.appendChild(container);
            
            // Store references
            this.container = container;
            this.button = button;
            this.chat = chat;
        }

        setupEventListeners() {
            this.button.addEventListener('click', () => {
                this.chat.classList.toggle('active');
            });
        }
    }

    // Make it globally available
    window.initEcomWidget = function(config) {
        return new EcommerceWidget(config);
    };
})();
