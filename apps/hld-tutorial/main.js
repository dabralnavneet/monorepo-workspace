const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lessonTitle = document.getElementById('lesson-title');
const lessonDesc = document.getElementById('lesson-desc');
const currentLessonName = document.getElementById('current-lesson-name');
const conceptDetails = document.getElementById('concept-details');
const runSimBtn = document.getElementById('run-sim');
const deepDiveContent = document.getElementById('deep-dive-content');

let animationId;
let nodes = [];
let particles = [];
let currentLesson = 'intro';

const lessons = {
    intro: {
        title: "System Design Basics",
        desc: "HLD focuses on the high-level architecture: how components (like servers, DBs) talk to each other.",
        setup: () => {
            nodes = [
                { id: 'client', x: 100, y: 300, label: 'Client', type: 'user' },
                { id: 'server', x: 400, y: 300, label: 'Application Server', type: 'server' },
                { id: 'db', x: 700, y: 300, label: 'Database', type: 'db' }
            ];
            createConnection('client', 'server');
            createConnection('server', 'db');
        },
        deepDive: `
            <div class="deep-dive-section">
                <h3>What is HLD?</h3>
                <p>High-Level Design (HLD) defines the software's overall architecture, including component interactions, database design, and network protocols.</p>
                <div class="interview-qa">
                    <strong>Q: How do you start an HLD interview?</strong>
                    <p>A: Start with requirement gatherinig (Functional & Non-Functional), clarify constraints (DAU, storage, latency), and then draw the high-level skeleton.</p>
                </div>
            </div>
        `
    },
    'load-balancer': {
        title: "Load Balancing",
        desc: "Distributes incoming network traffic across multiple servers to ensure no single server bears too much load.",
        setup: () => {
            nodes = [
                { id: 'client', x: 100, y: 300, label: 'Users', type: 'user' },
                { id: 'lb', x: 300, y: 300, label: 'Load Balancer', type: 'lb' },
                { id: 's1', x: 600, y: 150, label: 'Server A', type: 'server' },
                { id: 's2', x: 600, y: 300, label: 'Server B', type: 'server' },
                { id: 's3', x: 600, y: 450, label: 'Server C', type: 'server' }
            ];
            createConnection('client', 'lb');
            createConnection('lb', 's1');
            createConnection('lb', 's2');
            createConnection('lb', 's3');
        },
        deepDive: `
            <div class="deep-dive-section">
                <h3>Load Balancing Algorithms</h3>
                <div class="trade-off-grid">
                    <div class="trade-off-card">
                        <h4>Round Robin</h4>
                        <p>Simple, but doesn't account for server load.</p>
                    </div>
                    <div class="trade-off-card">
                        <h4>Least Connections</h4>
                        <p>Better for long-lived connections (e.g., chat apps).</p>
                    </div>
                </div>
                <div class="interview-qa">
                    <strong>Q: Where do you place LBs?</strong>
                    <p>A: Client-Server, Web Server-App Server, App Server-DB.</p>
                </div>
            </div>
        `
    },
    caching: {
        title: "Caching Layer",
        desc: "Caching stores copies of data in a high-speed storage layer so that future requests can be served faster.",
        setup: () => {
            nodes = [
                { id: 'client', x: 100, y: 300, label: 'Client', type: 'user' },
                { id: 'cache', x: 350, y: 200, label: 'Redis Cache', type: 'cache' },
                { id: 'server', x: 350, y: 400, label: 'App Server', type: 'server' },
                { id: 'db', x: 650, y: 400, label: 'Main DB', type: 'db' }
            ];
            createConnection('client', 'cache');
            createConnection('client', 'server');
            createConnection('server', 'db');
            createConnection('server', 'cache');
        },
        deepDive: `
            <div class="deep-dive-section">
                <h3>Cache Invalidation Strategies</h3>
                <ul>
                    <li><strong>Write-through:</strong> Data written to cache and DB simultaneously.</li>
                    <li><strong>Write-back:</strong> Data written to cache only; DB updated later.</li>
                    <li><strong>Cache-aside:</strong> App checks cache, then DB, then updates cache.</li>
                </ul>
                <div class="interview-qa">
                    <strong>Q: What is the Thundering Herd problem?</strong>
                    <p>A: When a popular cache key expires and many requests hit the DB at once.</p>
                </div>
            </div>
        `
    },
    scaling: {
        title: "Database Scaling",
        desc: "Scaling can be Vertical (bigger machine) or Horizontal (more machines). Sharding splits data across multiple DBs.",
        setup: () => {
            nodes = [
                { id: 'server', x: 100, y: 300, label: 'App Server', type: 'server' },
                { id: 'proxy', x: 300, y: 300, label: 'DB Proxy', type: 'lb' },
                { id: 'shard1', x: 600, y: 150, label: 'Shard A (Users)', type: 'db' },
                { id: 'shard2', x: 600, y: 300, label: 'Shard B (Orders)', type: 'db' },
                { id: 'shard3', x: 600, y: 450, label: 'Shard C (Logs)', type: 'db' }
            ];
            createConnection('server', 'proxy');
            createConnection('proxy', 'shard1');
            createConnection('proxy', 'shard2');
            createConnection('proxy', 'shard3');
        },
        deepDive: `
            <div class="deep-dive-section">
                <h3>Horizontal Scaling Techniques</h3>
                <div class="trade-off-grid">
                    <div class="trade-off-card pro">
                        <h4>Replication</h4>
                        <p>Standard for read-heavy apps. Master-Slave or Master-Master.</p>
                    </div>
                    <div class="trade-off-card con">
                        <h4>Sharding</h4>
                        <p>Complex to implement. Hard to join across shards.</p>
                    </div>
                </div>
            </div>
        `
    },
    async: {
        title: "Asynchronous Processing",
        desc: "Using Message Queues (Kafka, RabbitMQ) to decouple services and handle long-running tasks.",
        setup: () => {
            nodes = [
                { id: 'producer', x: 100, y: 300, label: 'Auth Svc', type: 'server' },
                { id: 'queue', x: 400, y: 300, label: 'Kafka Broker', type: 'lb' },
                { id: 'worker1', x: 700, y: 200, label: 'Email Worker', type: 'server' },
                { id: 'worker2', x: 700, y: 400, label: 'Audit Worker', type: 'server' }
            ];
            createConnection('producer', 'queue');
            createConnection('queue', 'worker1');
            createConnection('queue', 'worker2');
        },
        deepDive: `
            <div class="deep-dive-section">
                <h3>Why use Message Queues?</h3>
                <p>Decoupling, peak smoothing (load leveling), and higher availability.</p>
                <div class="interview-qa">
                    <strong>Q: Difference between Pull vs Push?</strong>
                    <p>A: Kafka (Pull): Consumers pull at their own pace. RabbitMQ (Push): Broker pushes to consumers.</p>
                </div>
            </div>
        `
    },
    cdn: {
        title: "CDN & Edge Computing",
        desc: "Distributing static content closer to users globally to reduce latency.",
        setup: () => {
            nodes = [
                { id: 'global', x: 100, y: 300, label: 'Origin Server', type: 'db' },
                { id: 'edge1', x: 400, y: 150, label: 'NJ Edge', type: 'cache' },
                { id: 'edge2', x: 400, y: 450, label: 'Mumbai Edge', type: 'cache' },
                { id: 'u1', x: 700, y: 100, label: 'US User', type: 'user' },
                { id: 'u2', x: 700, y: 500, label: 'IN User', type: 'user' }
            ];
            createConnection('u1', 'edge1');
            createConnection('u2', 'edge2');
            createConnection('edge1', 'global');
            createConnection('edge2', 'global');
        },
        deepDive: `
            <div class="deep-dive-section">
                <h3>Global Traffic Management</h3>
                <p>CDN (Content Delivery Network) reduces latency by serving content from the nearest POP (Point of Presence).</p>
                <div class="interview-qa">
                    <strong>Q: Dynamic content in CDN?</strong>
                    <p>A: Edge Side Includes (ESI) or Lambda@Edge can handle some dynamic logic at the edge.</p>
                </div>
            </div>
        `
    },
    cap: {
        title: "CAP Theorem",
        desc: "A distributed system can only provide 2 out of 3: Consistency, Availability, Partition Tolerance.",
        setup: () => {
            nodes = [
                { id: 'n1', x: 200, y: 300, label: 'Node A', type: 'server' },
                { id: 'n2', x: 600, y: 300, label: 'Node B', type: 'server' }
            ];
            createConnection('n1', 'n2');
        },
        deepDive: `
            <div class="deep-dive-section">
                <h3>The CAP Trade-off</h3>
                <ul>
                    <li><strong>CP (Consistency/Partition Tolerance):</strong> System returns error if nodes can't sync. (e.g., MongoDB standard)</li>
                    <li><strong>AP (Availability/Partition Tolerance):</strong> System returns old data if nodes can't sync. (e.g., Cassandra)</li>
                </ul>
                <div class="interview-qa">
                    <strong>Q: Does CA exist?</strong>
                    <p>A: No. Network partitions are inevitable in distributed systems, so we MUST choose between C and A.</p>
                </div>
            </div>
        `
    },
    cheatsheet: {
        title: "Interview Cheat Sheet",
        desc: "Quick reference for system design components and their usage.",
        setup: () => {
            nodes = []; // No visualization for cheatsheet
        },
        deepDive: `
            <div class="cheat-sheet-grid">
                <div class="concept-card">
                    <h4>Latency Targets</h4>
                    <p>L1 Cache: 0.5ns<br>SSD: 0.1ms<br>Int-Net: 150ms</p>
                </div>
                <div class="concept-card">
                    <h4>Availability</h4>
                    <p>Two 9s: 3.6 days/yr<br>Five 9s: 5 mins/yr</p>
                </div>
                <div class="concept-card">
                    <h4>Protocols</h4>
                    <p>HTTP/WebSockets/gRPC</p>
                </div>
            </div>
        `
    }
};

function init() {
    resize();
    window.addEventListener('resize', resize);
    
    // Sidebar Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.classList.contains('nav-divider')) return;
        item.addEventListener('click', () => {
            document.querySelector('.nav-item.active').classList.remove('active');
            item.classList.add('active');
            loadLesson(item.dataset.lesson);
        });
    });

    // Tab Navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.tab-btn.active').classList.remove('active');
            document.querySelector('.tab-content.active').classList.remove('active');
            
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
        });
    });

    runSimBtn.addEventListener('click', startSimulation);
    
    loadLesson('intro');
    animate();
}

function resize() {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

function loadLesson(key) {
    currentLesson = key;
    const lesson = lessons[key];
    if(!lesson) return;

    lessonTitle.innerText = lesson.title;
    lessonDesc.innerText = lesson.desc;
    currentLessonName.innerText = lesson.title;
    deepDiveContent.innerHTML = lesson.deepDive;
    
    particles = [];
    nodes = [];
    lesson.setup();

    // Toggle Visualization display if it's cheatsheet
    if (key === 'cheatsheet') {
        document.querySelector('[data-tab="deepdive"]').click();
    } else {
        document.querySelector('[data-tab="visualization"]').click();
    }
}

function createConnection(fromId, toId) {
    const from = nodes.find(n => n.id === fromId);
    const to = nodes.find(n => n.id === toId);
    if (!from || !to) return;
    if (!from.connections) from.connections = [];
    from.connections.push(toId);
}

function startSimulation() {
    const entryPoints = nodes.filter(n => n.type === 'user' || (currentLesson === 'scaling' && n.type === 'server') || (currentLesson === 'async' && n.id === 'producer'));
    
    entryPoints.forEach(start => {
        for(let i=0; i<5; i++) {
            setTimeout(() => {
                if (!start.connections || start.connections.length === 0) return;
                const targetId = start.connections[Math.floor(Math.random() * start.connections.length)];
                particles.push({
                    x: start.x,
                    y: start.y,
                    startId: start.id,
                    targetId: targetId,
                    progress: 0,
                    speed: 0.01 + Math.random() * 0.01,
                    color: '#6366f1'
                });
            }, i * 300);
        }
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Connections
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
    ctx.lineWidth = 2;
    nodes.forEach(node => {
        if (node.connections) {
            node.connections.forEach(connId => {
                const target = nodes.find(n => n.id === connId);
                if (target) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                }
            });
        }
    });
    ctx.setLineDash([]);

    // Update & Draw Particles
    particles = particles.filter(p => p.progress < 1);
    particles.forEach(p => {
        const start = nodes.find(n => n.id === p.startId);
        const end = nodes.find(n => n.id === p.targetId);
        if (!start || !end) return;
        
        p.progress += p.speed;
        p.x = start.x + (end.x - start.x) * p.progress;
        p.y = start.y + (end.y - start.y) * p.progress;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        
        if (p.progress >= 1) {
            const nextTargetId = end.connections ? end.connections[Math.floor(Math.random() * end.connections.length)] : null;
            if (nextTargetId) {
                particles.push({
                    ...p,
                    progress: 0,
                    startId: end.id,
                    targetId: nextTargetId,
                    x: end.x,
                    y: end.y
                });
            }
        }
    });

    // Draw Nodes
    nodes.forEach(node => {
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        
        const gradient = ctx.createLinearGradient(node.x - 30, node.y - 30, node.x + 30, node.y + 30);
        if (node.type === 'user') gradient.addColorStop(0, '#6366f1'), gradient.addColorStop(1, '#4f46e5');
        else if (node.type === 'server') gradient.addColorStop(0, '#10b981'), gradient.addColorStop(1, '#059669');
        else if (node.type === 'db') gradient.addColorStop(0, '#f59e0b'), gradient.addColorStop(1, '#d97706');
        else if (node.type === 'cache') gradient.addColorStop(0, '#ec4899'), gradient.addColorStop(1, '#be185d');
        else gradient.addColorStop(0, '#a855f7'), gradient.addColorStop(1, '#9333ea');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(node.x - 40, node.y - 30, 80, 60, 10);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 45);
    });

    animationId = requestAnimationFrame(animate);
}

init();
