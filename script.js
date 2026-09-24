const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const robo = {

    x: 500,
    y: 400,

    escala: 1,

    rotacao: 0,

    reflexao: false,

    cisalhamento: false,

    animacao: true,

    velocidade: 4,

    passo: 0

};

const teclas = {};

document.addEventListener("keydown", function(event) {

    teclas[event.key.toLowerCase()] = true;

    if (event.key === " ") {

        event.preventDefault();

        robo.animacao = !robo.animacao;

        atualizarInterface();
    }

    if (event.key.toLowerCase() === "r") {

        robo.reflexao = !robo.reflexao;

        atualizarInterface();
    }

    if (event.key.toLowerCase() === "c") {

        robo.cisalhamento = !robo.cisalhamento;

        atualizarInterface();
    }

});


document.addEventListener("keyup", function(event) {

    teclas[event.key.toLowerCase()] = false;

});

canvas.addEventListener("mousemove", function(event) {

    if (event.buttons === 1) {

        const rect = canvas.getBoundingClientRect();

        robo.x = event.clientX - rect.left;
        robo.y = event.clientY - rect.top;

    }

});

function atualizarInterface() {

    document.getElementById("statusAnimacao").textContent =
        "Animação: " + (robo.animacao ? "ATIVADA" : "DESATIVADA");

    document.getElementById("statusReflexao").textContent =
        "Reflexão: " + (robo.reflexao ? "ATIVADA" : "DESATIVADA");

    document.getElementById("statusCisalhamento").textContent =
        "Cisalhamento: " + (robo.cisalhamento ? "ATIVADO" : "DESATIVADO");
}

function atualizarRobo() {

    let estaMovendo = false;

    if (teclas["w"] || teclas["arrowup"]) {
        robo.y -= robo.velocidade;
        estaMovendo = true;
    }

    if (teclas["s"] || teclas["arrowdown"]) {
        robo.y += robo.velocidade;
        estaMovendo = true;
    }

    if (teclas["a"] || teclas["arrowleft"]) {
        robo.x -= robo.velocidade;
        estaMovendo = true;
    }

    if (teclas["d"] || teclas["arrowright"]) {
        robo.x += robo.velocidade;
        estaMovendo = true;
    }

    if (teclas["q"]) {
        robo.rotacao -= 0.04;
    }

    if (teclas["e"]) {
        robo.rotacao += 0.04;
    }

    if (teclas["z"]) {
        robo.escala -= 0.01;
    }

    if (teclas["x"]) {
        robo.escala += 0.01;
    }

    robo.escala = Math.max(0.5, Math.min(2, robo.escala));

    robo.x = Math.max(80, Math.min(canvas.width - 80, robo.x));
    robo.y = Math.max(100, Math.min(canvas.height - 100, robo.y));

    return estaMovendo;
}

function desenharFundo() {

    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Céu

    const gradiente = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    gradiente.addColorStop(0, "#172554");
    gradiente.addColorStop(1, "#0f172a");

    ctx.fillStyle = gradiente;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Lua

    ctx.beginPath();

    ctx.arc(
        850,
        100,
        45,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#f8fafc";

    ctx.fill();


    // Estrelas

    ctx.fillStyle = "#ffffff";

    const estrelas = [
        [100, 80],
        [180, 140],
        [300, 70],
        [400, 120],
        [520, 60],
        [650, 150],
        [750, 50],
        [920, 180],
        [60, 230],
        [350, 200]
    ];

    estrelas.forEach(function(estrela) {

        ctx.beginPath();

        ctx.arc(
            estrela[0],
            estrela[1],
            2,
            0,
            Math.PI * 2
        );

        ctx.fill();

    });


    // Chão

    ctx.fillStyle = "#1e293b";

    ctx.fillRect(
        0,
        500,
        canvas.width,
        100
    );


    // Linha do chão

    ctx.strokeStyle = "#475569";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(0, 500);

    ctx.lineTo(canvas.width, 500);

    ctx.stroke();

    ctx.restore();
}

function retangulo(x, y, largura, altura, preenchimento, borda) {

    ctx.fillStyle = preenchimento;

    ctx.fillRect(
        x,
        y,
        largura,
        altura
    );

    ctx.strokeStyle = borda;

    ctx.lineWidth = 3;

    ctx.strokeRect(
        x,
        y,
        largura,
        altura
    );

}

function desenharCabeca() {

    ctx.save();

    // Escala local
    ctx.scale(1, 1);

    retangulo(
        -45,
        -190,
        90,
        65,
        "#64748b",
        "#e2e8f0"
    );


    // Olho esquerdo

    ctx.fillStyle = "#22d3ee";

    ctx.fillRect(
        -30,
        -170,
        18,
        12
    );


    // Olho direito

    ctx.fillRect(
        12,
        -170,
        18,
        12
    );


    // Antena

    ctx.strokeStyle = "#e2e8f0";

    ctx.lineWidth = 5;

    ctx.beginPath();

    ctx.moveTo(
        0,
        -190
    );

    ctx.lineTo(
        0,
        -215
    );

    ctx.stroke();


    ctx.beginPath();

    ctx.arc(
        0,
        -220,
        7,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#f59e0b";

    ctx.fill();


    ctx.restore();
}

function desenharCorpo() {

    ctx.save();

    retangulo(
        -65,
        -120,
        130,
        150,
        "#475569",
        "#e2e8f0"
    );


    // Painel

    retangulo(
        -40,
        -90,
        80,
        50,
        "#0f172a",
        "#94a3b8"
    );


    // Luzes do painel

    ctx.fillStyle = "#22d3ee";

    ctx.beginPath();

    ctx.arc(
        -20,
        -65,
        6,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "#f59e0b";

    ctx.beginPath();

    ctx.arc(
        0,
        -65,
        6,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.fillStyle = "#ef4444";

    ctx.beginPath();

    ctx.arc(
        20,
        -65,
        6,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.restore();
}

function desenharBraco(lado, angulo) {

    ctx.save();

    // Rotação no ponto fixo do ombro
    ctx.translate(
        lado * 65,
        -105
    );

    ctx.rotate(
        angulo
    );

    // Braço superior
    retangulo(
        -15,
        0,
        30,
        75,
        "#64748b",
        "#e2e8f0"
    );

    // Hierarquia:
    // Braço → Antebraço
    ctx.translate(
        0,
        75
    );

    ctx.rotate(
        Math.sin(robo.passo * 2) * 0.3
    );

    retangulo(
        -13,
        0,
        26,
        65,
        "#94a3b8",
        "#e2e8f0"
    );

    // Mão
    ctx.translate(
        0,
        65
    );

    ctx.scale(
        1.2,
        1.2
    );

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        15,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#cbd5e1";

    ctx.fill();

    ctx.strokeStyle = "#e2e8f0";

    ctx.stroke();

    ctx.restore();
}

function desenharPerna(lado, angulo) {

    ctx.save();

    ctx.translate(
        lado * 35,
        30
    );

    ctx.rotate(
        angulo
    );


    // Coxa

    retangulo(
        -18,
        0,
        36,
        70,
        "#475569",
        "#e2e8f0"
    );


    // Joelho

    ctx.translate(
        0,
        70
    );

    ctx.scale(
        0.9,
        0.9
    );


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        20,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#64748b";

    ctx.fill();

    ctx.strokeStyle = "#e2e8f0";

    ctx.stroke();


    // Panturrilha

    ctx.translate(
        0,
        18
    );

    ctx.rotate(
        -angulo * 0.5
    );


    retangulo(
        -16,
        0,
        32,
        65,
        "#64748b",
        "#e2e8f0"
    );


    // Pé

    ctx.translate(
        0,
        65
    );

    ctx.scale(
        1.3,
        0.7
    );


    ctx.beginPath();

    ctx.roundRect(
        -25,
        0,
        50,
        30,
        8
    );

    ctx.fillStyle = "#94a3b8";

    ctx.fill();

    ctx.strokeStyle = "#e2e8f0";

    ctx.stroke();


    ctx.restore();
}

function desenharRobo() {

    ctx.save();

    ctx.translate(
        robo.x,
        robo.y
    );

    ctx.rotate(
        robo.rotacao
    );

    ctx.scale(
        robo.escala,
        robo.escala
    );

    if (robo.reflexao) {

        ctx.scale(
            -1,
            1
        );

    }

    if (robo.cisalhamento) {

        ctx.transform(
            1,
            0,
            0.25,
            1,
            0,
            0
        );

    }

    const movimentoPerna =
        robo.animacao
            ? Math.sin(robo.passo) * 0.35
            : 0;


    desenharPerna(
        -1,
        movimentoPerna
    );


    desenharPerna(
        1,
        -movimentoPerna
    );

    desenharCorpo();

    desenharCabeca();

    const movimentoBraco =
        robo.animacao
            ? Math.sin(robo.passo) * 0.5
            : 0;


    desenharBraco(
        -1,
        -0.3 + movimentoBraco
    );


    desenharBraco(
        1,
        0.3 - movimentoBraco
    );


    ctx.restore();
}

function desenharSombra() {

    ctx.save();

    // Reset da matriz
    ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
    );

    // A sombra acompanha somente a posição X
    ctx.translate(
        robo.x,
        500
    );

    // Escala horizontal da sombra
    ctx.scale(
        1.5 * robo.escala,
        0.3
    );

    ctx.beginPath();

    ctx.ellipse(
        0,
        0,
        70,
        25,
        0,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";

    ctx.fill();

    ctx.restore();
}

function desenharInformacoesCena() {

    ctx.save();

    ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
    );


    ctx.fillStyle = "#e2e8f0";

    ctx.font = "16px Arial";

    ctx.fillText(
        "TRANSFORMAÇÕES 2D",
        20,
        30
    );


    ctx.font = "13px Arial";

    ctx.fillText(
        "Translate + Rotate + Scale + Hierarquia",
        20,
        52
    );


    ctx.restore();
}

function animar() {

    ctx.setTransform(
        1,
        0,
        0,
        1,
        0,
        0
    );

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    const estaMovendo = atualizarRobo();

    if (robo.animacao && estaMovendo) {

        robo.passo += 0.08;

    } else if (!estaMovendo) {

        // Volta gradualmente para a pose neutra
        robo.passo *= 0.85;

        // Quando estiver praticamente em zero,
        // mantém exatamente a pose normal
        if (Math.abs(robo.passo) < 0.01) {
            robo.passo = 0;
        }
    }

    desenharFundo();

    desenharSombra();

    desenharRobo();

    desenharInformacoesCena();

    requestAnimationFrame(animar);
}

atualizarInterface();

animar();