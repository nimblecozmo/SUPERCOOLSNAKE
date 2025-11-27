document.addEventListener('DOMContentLoaded', () => {
    // Game elements
    const canvas = document.getElementById('game-board');
    const ctx = canvas.getContext('2d');
    const scoreElement = document.getElementById('score');
    const highScoreElement = document.getElementById('high-score');
    const startButton = document.getElementById('start-btn');
    const pauseButton = document.getElementById('pause-btn');
    const autopilotButton = document.getElementById('autopilot-btn');
    const autoClickerButton = document.getElementById('auto-clicker-btn');
    const resetButton = document.getElementById('reset-btn');
    const resetHsButton = document.getElementById('reset-hs-btn');
    const rebirthButton = document.getElementById('rebirth-btn');
    const speedButtons = document.querySelectorAll('.speed-btn');
    const myPetsList = document.getElementById('my-pets-list');
    const scoreMultiplierSpan = document.getElementById('score-multiplier');
    const rebirthsSpan = document.getElementById('rebirths');
    const rebirthMultiplierSpan = document.getElementById('rebirth-multiplier');
    const modal = document.getElementById('pet-odds-modal');
    const modalEggName = document.getElementById('modal-egg-name');
    const modalPetList = document.getElementById('modal-pet-list');
    const closeModalButton = document.querySelector('.close-button');
    const joystickContainer = document.getElementById('joystick-container');
    const joystick = document.getElementById('joystick');
    const gameOverEffect = document.getElementById('game-over-effect');
    const eatSound = document.getElementById('eat-sound');
    eatSound.volume = 0.3;
    const gameOverSound = document.getElementById('game-over-sound');

    // Game settings
    const gridSize = 20;
    const worldWidth = 100;
    const worldHeight = 100;

    // Egg & Pet definitions
    const eggs = {
        'common': { name: 'Common Egg', cost: 10, pool: 'common' },
        'uncommon': { name: 'Uncommon Egg', cost: 25, pool: 'uncommon' },
        'rare': { name: 'Rare Egg', cost: 50, pool: 'rare' },
        'epic': { name: 'Epic Egg', cost: 100, pool: 'epic' },
        'legendary': { name: 'Legendary Egg', cost: 250, pool: 'legendary' },
        'mythical': { name: 'Mythical Egg', cost: 500, pool: 'mythical' },
        'exotic': { name: 'Exotic Egg', cost: 1000, pool: 'exotic' },
        'bug': { name: 'Bug Egg', cost: 75, pool: 'bug' },
        'bee': { name: 'Bee Egg', cost: 75, pool: 'bee' },
        'anti-bee': { name: 'Anti-Bee Egg', cost: 75, pool: 'anti-bee' },
        'night': { name: 'Night Egg', cost: 150, pool: 'night' },
        'oasis': { name: 'Oasis Egg', cost: 150, pool: 'oasis' },
        'primal': { name: 'Primal Egg', cost: 300, pool: 'primal' },
        'dinosaur': { name: 'Dinosaur Egg', cost: 300, pool: 'dinosaur' },
        'brainrot': { name: 'Brainrot Egg', cost: 420, pool: 'brainrot' },
        'common-summer': { name: 'Common Summer Egg', cost: 20, pool: 'common-summer' },
        'rare-summer': { name: 'Rare Summer Egg', cost: 60, pool: 'rare-summer' },
        'paradise': { name: 'Paradise Egg', cost: 120, pool: 'paradise' },
    };

    const petPools = {
        'common': [
            { name: 'Baby Snake', multiplier: 0.1, rarity: 'common' },
            { name: 'Small Worm', multiplier: 0.11, rarity: 'common' },
            { name: 'Brown Snake', multiplier: 0.12, rarity: 'common' },
            { name: 'Garden Snake', multiplier: 0.13, rarity: 'common' },
            { name: 'Garter Snake', multiplier: 0.14, rarity: 'common' },
            { name: 'Corn Snake', multiplier: 0.15, rarity: 'common' },
            { name: 'Milk Snake', multiplier: 0.16, rarity: 'common' },
            { name: 'King Snake', multiplier: 0.17, rarity: 'common' },
            { name: 'Rat Snake', multiplier: 0.18, rarity: 'common' },
            { name: 'Grass Snake', multiplier: 0.19, rarity: 'common' },
        ],
        'uncommon': [
            { name: 'Green Snake', multiplier: 0.2, rarity: 'uncommon' },
            { name: 'Striped Snake', multiplier: 0.21, rarity: 'uncommon' },
            { name: 'Forest Snake', multiplier: 0.22, rarity: 'uncommon' },
            { name: 'Jungle Snake', multiplier: 0.23, rarity: 'uncommon' },
            { name: 'Vine Snake', multiplier: 0.24, rarity: 'uncommon' },
            { name: 'Tree Snake', multiplier: 0.25, rarity: 'uncommon' },
            { name: 'River Snake', multiplier: 0.26, rarity: 'uncommon' },
            { name: 'Pond Snake', multiplier: 0.27, rarity: 'uncommon' },
            { name: 'Marsh Snake', multiplier: 0.28, rarity: 'uncommon' },
            { name: 'Swamp Snake', multiplier: 0.29, rarity: 'uncommon' },
        ],
        'rare': [
            { name: 'Golden Snake', multiplier: 0.5, rarity: 'rare' },
            { name: 'Silver Snake', multiplier: 0.51, rarity: 'rare' },
            { name: 'Bronze Snake', multiplier: 0.52, rarity: 'rare' },
            { name: 'Crystal Snake', multiplier: 0.53, rarity: 'rare' },
            { name: 'Gem Snake', multiplier: 0.54, rarity: 'rare' },
            { name: 'Jewel Snake', multiplier: 0.55, rarity: 'rare' },
            { name: 'Sun Snake', multiplier: 0.56, rarity: 'rare' },
            { name: 'Moon Snake', multiplier: 0.57, rarity: 'rare' },
            { name: 'Star Snake', multiplier: 0.58, rarity: 'rare' },
            { name: 'Comet Snake', multiplier: 0.59, rarity: 'rare' },
        ],
        'epic': [
            { name: 'Rainbow Snake', multiplier: 1.0, rarity: 'epic' },
            { name: 'Aurora Snake', multiplier: 1.01, rarity: 'epic' },
            { name: 'Galaxy Snake', multiplier: 1.02, rarity: 'epic' },
            { name: 'Nebula Snake', multiplier: 1.03, rarity: 'epic' },
            { name: 'Cosmic Snake', multiplier: 1.04, rarity: 'epic' },
            { name: 'Supernova Snake', multiplier: 1.05, rarity: 'epic' },
            { name: 'Pulsar Snake', multiplier: 1.06, rarity: 'epic' },
            { name: 'Quasar Snake', multiplier: 1.07, rarity: 'epic' },
            { name: 'Black Hole Snake', multiplier: 1.08, rarity: 'epic' },
            { name: 'White Hole Snake', multiplier: 1.09, rarity: 'epic' },
        ],
        'legendary': [
            { name: 'Legendary Serpent', multiplier: 2.0, rarity: 'legendary' },
            { name: 'Sea Serpent', multiplier: 2.01, rarity: 'legendary' },
            { name: 'Sky Serpent', multiplier: 2.02, rarity: 'legendary' },
            { name: 'Earth Serpent', multiplier: 2.03, rarity: 'legendary' },
            { name: 'Fire Serpent', multiplier: 2.04, rarity: 'legendary' },
            { name: 'Ice Serpent', multiplier: 2.05, rarity: 'legendary' },
            { name: 'Lightning Serpent', multiplier: 2.06, rarity: 'legendary' },
            { name: 'Light Serpent', multiplier: 2.07, rarity: 'legendary' },
            { name: 'Dark Serpent', multiplier: 2.08, rarity: 'legendary' },
            { name: 'Aether Serpent', multiplier: 2.09, rarity: 'legendary' },
        ],
        'mythical': [
            { name: 'Mythical Hydra', multiplier: 5.0, rarity: 'mythical' },
            { name: 'Ouroboros', multiplier: 5.01, rarity: 'mythical' },
            { name: 'Jormungandr', multiplier: 5.02, rarity: 'mythical' },
            { name: 'Quetzalcoatl', multiplier: 5.03, rarity: 'mythical' },
            { name: 'Naga', multiplier: 5.04, rarity: 'mythical' },
            { name: 'Basilisk', multiplier: 5.05, rarity: 'mythical' },
            { name: 'Wyrm', multiplier: 5.06, rarity: 'mythical' },
            { name: 'Leviathan', multiplier: 5.07, rarity: 'mythical' },
            { name: 'Tiamat', multiplier: 5.08, rarity: 'mythical' },
            { name: 'Apophis', multiplier: 5.09, rarity: 'mythical' },
        ],
        'exotic': [
            { name: 'Exotic Drake', multiplier: 10.0, rarity: 'exotic' },
            { name: 'Infinity Drake', multiplier: 10.01, rarity: 'exotic' },
            { name: 'Timeless Drake', multiplier: 10.02, rarity: 'exotic' },
            { name: 'Spacetime Drake', multiplier: 10.03, rarity: 'exotic' },
            { name: 'Dimensional Drake', multiplier: 10.04, rarity: 'exotic' },
            { name: 'Reality Drake', multiplier: 10.05, rarity: 'exotic' },
            { name: 'Void Drake', multiplier: 10.06, rarity: 'exotic' },
            { name: 'Chaos Drake', multiplier: 10.07, rarity: 'exotic' },
            { name: 'Order Drake', multiplier: 10.08, rarity: 'exotic' },
            { name: 'Dream Drake', multiplier: 10.09, rarity: 'exotic' },
        ],
        'bug': [
            { name: 'Ladybug', multiplier: 0.3, rarity: 'special' },
            { name: 'Stag Beetle', multiplier: 0.4, rarity: 'special' },
            { name: 'Ant', multiplier: 0.31, rarity: 'special' },
            { name: 'Grasshopper', multiplier: 0.32, rarity: 'special' },
            { name: 'Praying Mantis', multiplier: 0.41, rarity: 'special' },
            { name: 'Caterpillar', multiplier: 0.33, rarity: 'special' },
            { name: 'Butterfly', multiplier: 0.42, rarity: 'special' },
            { name: 'Spider', multiplier: 0.34, rarity: 'special' },
            { name: 'Centipede', multiplier: 0.43, rarity: 'special' },
            { name: 'Millipede', multiplier: 0.35, rarity: 'special' },
        ],
        'bee': [
            { name: 'Bumblebee', multiplier: 0.3, rarity: 'special' },
            { name: 'Honey Bee', multiplier: 0.4, rarity: 'special' },
            { name: 'Queen Bee', multiplier: 0.5, rarity: 'special' },
            { name: 'Worker Bee', multiplier: 0.31, rarity: 'special' },
            { name: 'Drone Bee', multiplier: 0.32, rarity: 'special' },
            { name: 'Carpenter Bee', multiplier: 0.41, rarity: 'special' },
            { name: 'Sweat Bee', multiplier: 0.33, rarity: 'special' },
            { name: 'Mining Bee', multiplier: 0.34, rarity: 'special' },
            { name: 'Leafcutter Bee', multiplier: 0.42, rarity: 'special' },
            { name: 'Mason Bee', multiplier: 0.43, rarity: 'special' },
        ],
        'anti-bee': [
            { name: 'Wasp', multiplier: 0.3, rarity: 'special' },
            { name: 'Hornet', multiplier: 0.4, rarity: 'special' },
            { name: 'Yellow Jacket', multiplier: 0.5, rarity: 'special' },
            { name: 'Paper Wasp', multiplier: 0.31, rarity: 'special' },
            { name: 'Mud Dauber', multiplier: 0.32, rarity: 'special' },
            { name: 'Spider Wasp', multiplier: 0.41, rarity: 'special' },
            { name: 'Velvet Ant', multiplier: 0.33, rarity: 'special' },
            { name: 'Ichneumon Wasp', multiplier: 0.34, rarity: 'special' },
            { name: 'Gall Wasp', multiplier: 0.42, rarity: 'special' },
            { name: 'Fig Wasp', multiplier: 0.43, rarity: 'special' },
        ],
        'night': [
            { name: 'Bat', multiplier: 0.6, rarity: 'special' },
            { name: 'Owl', multiplier: 0.7, rarity: 'special' },
            { name: 'Firefly', multiplier: 0.61, rarity: 'special' },
            { name: 'Moth', multiplier: 0.62, rarity: 'special' },
            { name: 'Nightjar', multiplier: 0.71, rarity: 'special' },
            { name: 'Wolf', multiplier: 0.8, rarity: 'special' },
            { name: 'Fox', multiplier: 0.72, rarity: 'special' },
            { name: 'Badger', multiplier: 0.63, rarity: 'special' },
            { name: 'Hedgehog', multiplier: 0.64, rarity: 'special' },
            { name: 'Raccoon', multiplier: 0.73, rarity: 'special' },
        ],
        'oasis': [
            { name: 'Camel', multiplier: 0.6, rarity: 'special' },
            { name: 'Scorpion', multiplier: 0.7, rarity: 'special' },
            { name: 'Fennec Fox', multiplier: 0.61, rarity: 'special' },
            { name: 'Meerkat', multiplier: 0.62, rarity: 'special' },
            { name: 'Vulture', multiplier: 0.71, rarity: 'special' },
            { name: 'Cobra', multiplier: 0.8, rarity: 'special' },
            { name: 'Gazelle', multiplier: 0.72, rarity: 'special' },
            { name: 'Oryx', multiplier: 0.63, rarity: 'special' },
            { name: 'Addax', multiplier: 0.64, rarity: 'special' },
            { name: 'Jerboa', multiplier: 0.73, rarity: 'special' },
        ],
        'primal': [
            { name: 'Sabertooth', multiplier: 1.2, rarity: 'special' },
            { name: 'Mammoth', multiplier: 1.3, rarity: 'special' },
            { name: 'Dire Wolf', multiplier: 1.21, rarity: 'special' },
            { name: 'Cave Bear', multiplier: 1.22, rarity: 'special' },
            { name: 'Megalodon', multiplier: 1.31, rarity: 'special' },
            { name: 'Titanoboa', multiplier: 1.5, rarity: 'special' },
            { name: 'Argentavis', multiplier: 1.4, rarity: 'special' },
            { name: 'Glyptodon', multiplier: 1.23, rarity: 'special' },
            { name: 'Doedicurus', multiplier: 1.24, rarity: 'special' },
            { name: 'Megaloceros', multiplier: 1.32, rarity: 'special' },
        ],
        'dinosaur': [
            { name: 'Raptor', multiplier: 1.2, rarity: 'special' },
            { name: 'T-Rex', multiplier: 1.5, rarity: 'special' },
            { name: 'Triceratops', multiplier: 1.3, rarity: 'special' },
            { name: 'Stegosaurus', multiplier: 1.31, rarity: 'special' },
            { name: 'Brontosaurus', multiplier: 1.4, rarity: 'special' },
            { name: 'Pterodactyl', multiplier: 1.21, rarity: 'special' },
            { name: 'Ankylosaurus', multiplier: 1.32, rarity: 'special' },
            { name: 'Spinosaurus', multiplier: 1.41, rarity: 'special' },
            { name: 'Allosaurus', multiplier: 1.22, rarity: 'special' },
            { name: 'Dilophosaurus', multiplier: 1.23, rarity: 'special' },
        ],
        'brainrot': [
            { name: 'Skibidi', multiplier: 1.8, rarity: 'special' },
            { name: 'Sigma', multiplier: 2.2, rarity: 'special' },
            { name: 'Rizzler', multiplier: 1.9, rarity: 'special' },
            { name: 'Fanum Tax', multiplier: 2.0, rarity: 'special' },
            { name: 'Grimace Shake', multiplier: 1.81, rarity: 'special' },
            { name: 'Cameraman', multiplier: 1.91, rarity: 'special' },
            { name: 'Speakerman', multiplier: 2.01, rarity: 'special' },
            { name: 'TV Man', multiplier: 2.1, rarity: 'special' },
            { name: 'G-Man', multiplier: 2.5, rarity: 'special' },
            { name: 'Toilet', multiplier: 1.5, rarity: 'special' },
        ],
        'common-summer': [
            { name: 'Sun-kissed Serpent', multiplier: 0.25, rarity: 'summer' },
            { name: 'Seashell Snake', multiplier: 0.26, rarity: 'summer' },
            { name: 'Sandy Snake', multiplier: 0.27, rarity: 'summer' },
            { name: 'Beach Ball Python', multiplier: 0.28, rarity: 'summer' },
            { name: 'Ice Cream Snake', multiplier: 0.29, rarity: 'summer' },
            { name: 'Popsicle Python', multiplier: 0.30, rarity: 'summer' },
            { name: 'Lemonade Viper', multiplier: 0.31, rarity: 'summer' },
            { name: 'Watermelon Snake', multiplier: 0.32, rarity: 'summer' },
            { name: 'Flip-Flop Cobra', multiplier: 0.33, rarity: 'summer' },
            { name: 'Sunglass Snake', multiplier: 0.34, rarity: 'summer' },
        ],
        'rare-summer': [
            { name: 'Tidal Drake', multiplier: 0.75, rarity: 'summer' },
            { name: 'Coral Snake', multiplier: 0.76, rarity: 'summer' },
            { name: 'Ocean Serpent', multiplier: 0.77, rarity: 'summer' },
            { name: 'Lagoon Leviathan', multiplier: 0.78, rarity: 'summer' },
            { name: 'Monsoon Mamba', multiplier: 0.79, rarity: 'summer' },
            { name: 'Hurricane Hydra', multiplier: 0.80, rarity: 'summer' },
            { name: 'Typhoon Python', multiplier: 0.81, rarity: 'summer' },
            { name: 'Cyclone Cobra', multiplier: 0.82, rarity: 'summer' },
            { name: 'Tsunami Taipan', multiplier: 0.83, rarity: 'summer' },
            { name: 'Volcano Viper', multiplier: 0.84, rarity: 'summer' },
        ],
        'paradise': [
            { name: 'Bird of Paradise', multiplier: 1.5, rarity: 'summer' },
            { name: 'Toucan', multiplier: 1.51, rarity: 'summer' },
            { name: 'Macaw', multiplier: 1.52, rarity: 'summer' },
            { name: 'Cockatoo', multiplier: 1.53, rarity: 'summer' },
            { name: 'Parrot', multiplier: 1.54, rarity: 'summer' },
            { name: 'Hummingbird', multiplier: 1.55, rarity: 'summer' },
            { name: 'Quetzal', multiplier: 1.56, rarity: 'summer' },
            { name: 'Peacock', multiplier: 1.57, rarity: 'summer' },
            { name: 'Flamingo', multiplier: 1.58, rarity: 'summer' },
            { name: 'Swan', multiplier: 1.59, rarity: 'summer' },
        ],
    };

    // Game state
    let snake = [], foods = [], pets = [], particles = [];
    let scoreMultiplier = 1.0, direction = 'right', nextDirection = 'right';
    let gameRunning = false, gamePaused = false, autopilot = false, autoClickerActive = false;
    let score = 0, highScore = parseInt(localStorage.getItem('snakeHighScore')) || 0;
    let gameSpeed = 150, gameLoop, hueOffset = 0, autoClickInterval, currentSpeed = 4;
    let rebirths = 0, rebirthMultiplier = 1.0, rebirthCost = 10000;
    let touchStartX = 0, touchStartY = 0;
    const maxFood = 500;
    let foodPositions = new Set();

    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Initialize
    highScoreElement.textContent = formatNumber(highScore);
    loadPets();
    loadRebirths();
    updateScoreMultiplier();
    updateRebirthUI();

    // Functions
    function formatNumber(num) {
        if (num < 1e6) return num.toString();
        if (num >= 1e6 && num < 1e9) return (num / 1e6).toFixed(2) + 'm';
        if (num >= 1e9 && num < 1e12) return (num / 1e9).toFixed(2) + 'b';
        if (num >= 1e12 && num < 1e15) return (num / 1e12).toFixed(2) + 't';
        if (num >= 1e15 && num < 1e18) return (num / 1e15).toFixed(2) + 'QA';
        if (num >= 1e18 && num < 1e21) return (num / 1e18).toFixed(2) + 'QI';
        if (num >= 1e21 && num < 1e24) return (num / 1e21).toFixed(2) + 'sx';
        if (num >= 1e24) return (num / 1e24).toFixed(2) + 'sp';
    }

    function initGame() {
        snake = [
            {x: worldWidth / 2, y: worldHeight / 2},
            {x: worldWidth / 2 - 1, y: worldHeight / 2},
            {x: worldWidth / 2 - 2, y: worldHeight / 2}
        ];
        foods = [];
        foodPositions.clear();
        generateFoods();
        score = 0;
        scoreElement.textContent = formatNumber(score);
        direction = 'right';
        nextDirection = 'right';
        draw();
    }

    function generateFoods() {
        if (snake.length === 0 || foods.length >= maxFood) return;

        const head = snake[0];
        const viewRadius = 20;
        const spacing = 2;
        const attempts = currentSpeed; // Use currentSpeed for attempts

        for (let i = 0; i < attempts; i++) {
            if (foods.length >= maxFood) break;

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * viewRadius;
            const x = Math.floor(head.x + Math.cos(angle) * distance);
            const y = Math.floor(head.y + Math.sin(angle) * distance);
            const posKey = `${x},${y}`;

            if (foodPositions.has(posKey)) continue;

            let isOccupied = false;
            // Check snake
            for (const segment of snake) {
                if (segment.x === x && segment.y === y) {
                    isOccupied = true;
                    break;
                }
            }
            if (isOccupied) continue;

            // Check other food with spacing
            let tooClose = false;
            for (let dx = -spacing; dx <= spacing; dx++) {
                for (let dy = -spacing; dy <= spacing; dy++) {
                    if (foodPositions.has(`${x + dx},${y + dy}`)) {
                        tooClose = true;
                        break;
                    }
                }
                if (tooClose) break;
            }
            if (tooClose) continue;


            const foodPosition = { x, y };
            foods.push(foodPosition);
            foodPositions.add(posKey);
        }
    }

    function draw() {
        if (snake.length === 0) return;
        const offsetX = canvas.width / 2 - snake[0].x * gridSize, offsetY = canvas.height / 2 - snake[0].y * gridSize;
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(offsetX, offsetY);
        for (let i = 0; i < snake.length; i++) {
            const segment = snake[i], hue = (hueOffset + i * 10) % 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
            if (i === 0) {
                ctx.fillStyle = 'white';
                if (direction === 'right') { ctx.fillRect(segment.x * gridSize + 15, segment.y * gridSize + 5, 3, 3); ctx.fillRect(segment.x * gridSize + 15, segment.y * gridSize + 12, 3, 3); }
                else if (direction === 'left') { ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 5, 3, 3); ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 12, 3, 3); }
                else if (direction === 'up') { ctx.fillRect(segment.x * gridSize + 5, segment.y * gridSize + 2, 3, 3); ctx.fillRect(segment.x * gridSize + 12, segment.y * gridSize + 2, 3, 3); }
                else if (direction === 'down') { ctx.fillRect(segment.x * gridSize + 5, segment.y * gridSize + 15, 3, 3); ctx.fillRect(segment.x * gridSize + 12, segment.y * gridSize + 15, 3, 3); }
                else if (direction === 'up-right') { ctx.fillRect(segment.x * gridSize + 15, segment.y * gridSize + 2, 3, 3); }
                else if (direction === 'up-left') { ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 2, 3, 3); }
                else if (direction === 'down-right') { ctx.fillRect(segment.x * gridSize + 15, segment.y * gridSize + 15, 3, 3); }
                else if (direction === 'down-left') { ctx.fillRect(segment.x * gridSize + 2, segment.y * gridSize + 15, 3, 3); }
            }
            ctx.strokeStyle = '#000';
            ctx.strokeRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
        }
        for (const food of foods) {
            ctx.fillStyle = '#f72585';
            ctx.beginPath();
            ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(food.x * gridSize + gridSize / 2 - 3, food.y * gridSize + gridSize / 2 - 3, gridSize / 6, 0, Math.PI * 2);
            ctx.fill();
        }
        updateAndDrawParticles();
        ctx.restore();
    }

    function updateAndDrawParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.02;
            if (p.alpha <= 0) {
                particles.splice(i, 1);
            } else {
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1.0;
            }
        }
    }

    function createExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            particles.push({
                x: x * gridSize + gridSize / 2,
                y: y * gridSize + gridSize / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 2 + 1,
                color: `hsl(${Math.random() * 360}, 100%, 60%)`,
                alpha: 1
            });
        }
    }

    function moveSnake() {
        const oldHead = {...snake[0]};
        direction = nextDirection;
        const head = {...snake[0]};
        switch(direction) {
            case 'right': head.x++; break;
            case 'left': head.x--; break;
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'up-right': head.y--; head.x++; break;
            case 'up-left': head.y--; head.x--; break;
            case 'down-right': head.y++; head.x++; break;
            case 'down-left': head.y++; head.x--; break;
        }

        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }

        snake.unshift(head);
        let foodEaten = false;
        for (let i = 0; i < foods.length; i++) {
            if (head.x === foods[i].x && head.y === foods[i].y) {
                foodEaten = true;
                eatSound.play();
                
                createExplosion(foods[i].x, foods[i].y);
                score += Math.round(1 * scoreMultiplier * rebirthMultiplier);
                scoreElement.textContent = formatNumber(score);
                if (score > highScore) { highScore = score; highScoreElement.textContent = formatNumber(highScore); localStorage.setItem('snakeHighScore', highScore); }
                const posKey = `${foods[i].x},${foods[i].y}`;
                foodPositions.delete(posKey);
                foods.splice(i, 1);
                break;
            }
        }
        if (!foodEaten) snake.pop();
    }

    function getSafeDirections(head, currentDirection) {
        const allDirections = ['up', 'down', 'left', 'right'];
        return allDirections.filter(dir => {
            if ((dir === 'right' && currentDirection === 'left') || (dir === 'left' && currentDirection === 'right') || (dir === 'up' && currentDirection === 'down') || (dir === 'down' && currentDirection === 'up')) return false;
            const testHead = { ...head };
            switch (dir) {
                case 'right': testHead.x++; break;
                case 'left': testHead.x--; break;
                case 'up': testHead.y--; break;
                case 'down': testHead.y++; break;
            }
            for (let segment of snake) if (segment.x === testHead.x && segment.y === testHead.y) return false;
            return true;
        });
    }

    function autopilotMove() {
        const head = snake[0];
        let nearestFood = null, minDistance = Infinity;
        if (foods.length === 0) { const safeDirections = getSafeDirections(head, direction); if (safeDirections.length > 0) nextDirection = safeDirections[0]; return; }
        for (const food of foods) { const dx = head.x - food.x, dy = head.y - food.y, distance = Math.sqrt(dx * dx + dy * dy); if (distance < minDistance) { minDistance = distance; nearestFood = food; } }

        const dx = nearestFood.x - head.x;
        const dy = nearestFood.y - head.y;

        const preferredDirections = [];
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) preferredDirections.push('right');
            if (dx < 0) preferredDirections.push('left');
            if (dy > 0) preferredDirections.push('down');
            if (dy < 0) preferredDirections.push('up');
        } else {
            if (dy > 0) preferredDirections.push('down');
            if (dy < 0) preferredDirections.push('up');
            if (dx > 0) preferredDirections.push('right');
            if (dx < 0) preferredDirections.push('left');
        }

        const safeDirections = getSafeDirections(head, direction);
        for (const dir of preferredDirections) if (safeDirections.includes(dir)) { nextDirection = dir; return; }
        if (safeDirections.length > 0) nextDirection = safeDirections[0];
    }

    function gameStep() { if (gamePaused) return; generateFoods(); hueOffset = (hueOffset + 5) % 360; if (autopilot) autopilotMove(); moveSnake(); draw(); }
    function startGame() { if (!gameRunning) { initGame(); gameRunning = true; gamePaused = false; gameLoop = setInterval(gameStep, gameSpeed); startButton.textContent = 'Restart Game'; } else if (gamePaused) { gamePaused = false; pauseButton.textContent = 'Pause Game'; } }
    function pauseGame() { if (gameRunning && !gamePaused) { gamePaused = true; pauseButton.textContent = 'Resume Game'; } else if (gameRunning && gamePaused) { gamePaused = false; pauseButton.textContent = 'Pause Game'; } }
    function resetGame() { clearInterval(gameLoop); gameRunning = false; gamePaused = false; autopilot = false; autopilotButton.textContent = 'Autopilot: OFF'; initGame(); startButton.textContent = 'Start Game'; pauseButton.textContent = 'Pause Game'; }
    function resetHighScore() { localStorage.removeItem('snakeHighScore'); highScore = 0; highScoreElement.textContent = formatNumber(highScore); }
    function gameOver() {
        clearInterval(gameLoop);
        gameRunning = false;
        gameOverSound.play();
        gameOverEffect.classList.add('active');
        setTimeout(() => {
            resetGame();
            gameOverEffect.classList.remove('active');
        }, 500);
    }
    function changeGameSpeed(speed) {
        currentSpeed = speed;
        if (parseInt(speed) === 9) gameSpeed = 2;
        else gameSpeed = 200 - (speed * 15);
        if (gameRunning && !gamePaused) {
            clearInterval(gameLoop);
            gameLoop = setInterval(gameStep, gameSpeed);
        }
    }
    function toggleAutopilot() { if (gameRunning) { autopilot = !autopilot; autopilotButton.textContent = `Autopilot: ${autopilot ? 'ON' : 'OFF'}`; autopilotButton.classList.toggle('autopilot-active', autopilot); } }
    function toggleAutoClicker() {
        autoClickerActive = !autoClickerActive;
        autoClickerButton.textContent = `Auto Clicker: ${autoClickerActive ? 'ON' : 'OFF'}`;
        autoClickerButton.classList.toggle('autoclicker-active', autoClickerActive);

        if (autoClickerActive) {
            window.addEventListener('mousemove', updateMousePosition);
            autoClickInterval = setInterval(() => {
                const element = document.elementFromPoint(mouseX, mouseY);
                console.log('Auto-clicking:', element);
                if (element && element.id !== 'auto-clicker-btn' && !element.classList.contains('up-btn') && !element.classList.contains('left-btn') && !element.classList.contains('right-btn') && !element.classList.contains('down-btn')) {
                    element.click();
                }
            }, 1);
        } else {
            clearInterval(autoClickInterval);
            autoClickInterval = null;
            window.removeEventListener('mousemove', updateMousePosition);
        }
    }
    let mouseX, mouseY;
    function updateMousePosition(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    function handleKeyDown(e) {
        if (!gameRunning || gamePaused) return;
        const key = e.key.toLowerCase();
        let newDirection = nextDirection;

        if ((key === 'arrowup' || key === 'w') && direction !== 'down') {
            newDirection = 'up';
        } else if ((key === 'arrowdown' || key === 's') && direction !== 'up') {
            newDirection = 'down';
        } else if ((key === 'arrowleft' || key === 'a') && direction !== 'right') {
            newDirection = 'left';
        } else if ((key === 'arrowright' || key === 'd') && direction !== 'left') {
            newDirection = 'right';
        } else if (key === 'shift') {
            toggleAutopilot();
        } else if (key === 'alt') {
            e.preventDefault();
            toggleAutoClicker();
        } else if (key >= '1' && key <= '9') {
            changeGameSpeed(parseInt(key));
        }

        if (e.getModifierState('Shift')) {
            if (newDirection === 'up' && (nextDirection === 'left' || direction === 'left')) newDirection = 'up-left';
            if (newDirection === 'up' && (nextDirection === 'right' || direction === 'right')) newDirection = 'up-right';
            if (newDirection === 'down' && (nextDirection === 'left' || direction === 'left')) newDirection = 'down-left';
            if (newDirection === 'down' && (nextDirection === 'right' || direction === 'right')) newDirection = 'down-right';
            if (newDirection === 'left' && (nextDirection === 'up' || direction === 'up')) newDirection = 'up-left';
            if (newDirection === 'left' && (nextDirection === 'down' || direction === 'down')) newDirection = 'down-left';
            if (newDirection === 'right' && (nextDirection === 'up' || direction === 'up')) newDirection = 'up-right';
            if (newDirection === 'right' && (nextDirection === 'down' || direction === 'down')) newDirection = 'down-right';
        }

        nextDirection = newDirection;
    }
    function buyEgg(eggType) { const egg = eggs[eggType]; if (score >= egg.cost) { score -= egg.cost; scoreElement.textContent = formatNumber(score); hatchPet(egg.pool); } }
    function hatchPet(poolName) { const petPool = petPools[poolName]; const pet = petPool[Math.floor(Math.random() * petPool.length)]; pets.push(pet); savePets(); updateScoreMultiplier(); renderPets(); }
    function updateScoreMultiplier() { scoreMultiplier = 1.0; pets.forEach(pet => scoreMultiplier += pet.multiplier); scoreMultiplierSpan.textContent = `${scoreMultiplier.toFixed(1)}x`; }
    function renderPets() { myPetsList.innerHTML = ''; pets.forEach(pet => { const petDiv = document.createElement('div'); petDiv.className = `pet pet-${pet.rarity}`; petDiv.innerHTML = `<span class="pet-name">${pet.name}</span> <span class="pet-multiplier">+${pet.multiplier}x</span>`; myPetsList.appendChild(petDiv); }); }
    function savePets() { localStorage.setItem('snakePets', JSON.stringify(pets)); }
    function loadPets() {
        const savedPets = localStorage.getItem('snakePets');
        if (savedPets) {
            try {
                pets = JSON.parse(savedPets) || [];
            } catch (e) {
                console.error("Error parsing pets data:", e);
                pets = [];
            }
        }
        renderPets();
    }
    function rebirth() { if (score >= rebirthCost) { rebirths++; rebirthMultiplier += 0.5; rebirthCost = Math.round(rebirthCost * 1.5); saveRebirths(); updateRebirthUI(); score = 0; pets = []; savePets(); updateScoreMultiplier(); renderPets(); initGame(); } }
    function updateRebirthUI() { rebirthsSpan.textContent = rebirths; rebirthMultiplierSpan.textContent = `${rebirthMultiplier.toFixed(1)}x`; rebirthButton.textContent = `Rebirth (Cost: ${formatNumber(rebirthCost)})`; }
    function saveRebirths() { localStorage.setItem('snakeRebirths', JSON.stringify({ rebirths, rebirthMultiplier, rebirthCost })); }
    function loadRebirths() {
        const savedRebirths = localStorage.getItem('snakeRebirths');
        if (savedRebirths) {
            try {
                const data = JSON.parse(savedRebirths);
                rebirths = parseInt(data.rebirths) || 0;
                rebirthMultiplier = parseFloat(data.rebirthMultiplier) || 1.0;
                rebirthCost = parseInt(data.rebirthCost) || 10000;
            } catch (e) {
                console.error("Error parsing rebirths data:", e);
                rebirths = 0;
                rebirthMultiplier = 1.0;
                rebirthCost = 10000;
            }
        }
    }
    function showPetOdds(eggType) { const egg = eggs[eggType]; const petPool = petPools[egg.pool]; modalEggName.textContent = `${egg.name} Odds`; modalPetList.innerHTML = ''; petPool.forEach(pet => { const petOddDiv = document.createElement('div'); petOddDiv.className = 'modal-pet'; petOddDiv.innerHTML = `<span>${pet.name}</span><span>+${pet.multiplier}x</span><span>10%</span>`; modalPetList.appendChild(petOddDiv); }); modal.style.display = 'block'; }
    function hidePetOdds() { modal.style.display = 'none'; }

    function setupEventListeners() {
        startButton.addEventListener('click', startGame);
        pauseButton.addEventListener('click', pauseGame);
        autopilotButton.addEventListener('click', toggleAutopilot);
        autoClickerButton.addEventListener('click', toggleAutoClicker);
        resetButton.addEventListener('click', resetGame);
        resetHsButton.addEventListener('click', resetHighScore);
        rebirthButton.addEventListener('click', rebirth);
        for (const eggType in eggs) { document.getElementById(`egg-${eggType}`).addEventListener('click', (e) => { if(e.target.tagName !== 'BUTTON') { showPetOdds(eggType); } }); document.getElementById(`buy-egg-${eggType}`).addEventListener('click', () => buyEgg(eggType)); }
        speedButtons.forEach(button => button.addEventListener('click', () => changeGameSpeed(parseInt(button.getAttribute('data-speed')))));
        document.addEventListener('keydown', handleKeyDown);
        closeModalButton.addEventListener('click', hidePetOdds);
        window.addEventListener('click', (e) => { if (e.target == modal) { hidePetOdds(); } });

        if (isMobile()) {
            joystickContainer.style.display = 'block';
            let joystickActive = false;
            let joystickStartX = 0;
            let joystickStartY = 0;

            joystick.addEventListener('touchstart', (e) => {
                joystickActive = true;
                const rect = joystick.getBoundingClientRect();
                joystickStartX = rect.left + rect.width / 2;
                joystickStartY = rect.top + rect.height / 2;
            }, false);

            joystick.addEventListener('touchmove', (e) => {
                if (!joystickActive) return;
                e.preventDefault();
                const touch = e.touches[0];
                const dx = touch.clientX - joystickStartX;
                const dy = touch.clientY - joystickStartY;
                const angle = Math.atan2(dy, dx);
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDist = joystick.offsetWidth / 2;

                const x = Math.cos(angle) * Math.min(distance, maxDist);
                const y = Math.sin(angle) * Math.min(distance, maxDist);
                joystick.style.transform = `translate(${x}px, ${y}px)`;

                const angleDeg = angle * 180 / Math.PI;

                if (angleDeg > -22.5 && angleDeg <= 22.5 && direction !== 'left') nextDirection = 'right';
                else if (angleDeg > 22.5 && angleDeg <= 67.5 && direction !== 'up-left') nextDirection = 'down-right';
                else if (angleDeg > 67.5 && angleDeg <= 112.5 && direction !== 'up') nextDirection = 'down';
                else if (angleDeg > 112.5 && angleDeg <= 157.5 && direction !== 'up-right') nextDirection = 'down-left';
                else if ((angleDeg > 157.5 || angleDeg <= -157.5) && direction !== 'right') nextDirection = 'left';
                else if (angleDeg > -157.5 && angleDeg <= -112.5 && direction !== 'down-right') nextDirection = 'up-left';
                else if (angleDeg > -112.5 && angleDeg <= -67.5 && direction !== 'down') nextDirection = 'up';
                else if (angleDeg > -67.5 && angleDeg <= -22.5 && direction !== 'down-left') nextDirection = 'up-right';

            }, false);

            joystick.addEventListener('touchend', () => {
                joystickActive = false;
                joystick.style.transform = 'translate(0, 0)';
            }, false);
        }
    }

    // Initialize the game
    initGame();
    setupEventListeners();
});