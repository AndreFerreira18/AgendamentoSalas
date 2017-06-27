var floors = {
    "Andares": [
        "Rés-do-Chão",
        "1º Andar",
        "2º Andar",
        "3º Andar",
        "4º Andar",
        "5º Andar",
        "6º Andar",
        "7º Andar"
    ]
};

var rooms_0 = {
    "salas": [
        "Sala 0.1",
        "Sala 0.2",
        "Sala 0.3",
        "Sala 0.4"
    ]
}

var rooms_1 = {
    "salas": [
        "Sala 1.1",
        "Sala 1.2",
        "Sala 1.3",
        "Sala 1.4"
    ]
}

var rooms_2 = {
    "salas": [
        "Sala 2.1",
        "Sala 2.2",
        "Sala 2.3",
        "Sala 2.4"
    ]
}

var rooms_3 = {
    "salas": [
        "Sala 3.1",
        "Sala 3.2",
        "Sala 3.3",
        "Sala 3.4"
    ]
}

var rooms_4 = {
    "salas": [
        "Sala 4.1",
        "Sala 4.2",
        "Sala 4.3",
        "Sala 4.4"
    ]
}

var rooms_5 = {
    "salas": [
        "Sala 5.1",
        "Sala 5.2",
        "Sala 5.3",
        "Sala 5.4"
    ]
}

var rooms_6 = {
    "salas": [
        "Sala 6.1",
        "Sala 6.2",
        "Sala 6.3",
        "Sala 6.4"
    ]
}

var rooms_7 = {
    "salas": [
        "Sala 7.1",
        "Sala 7.2",
        "Sala 7.3",
        "Sala 7.4"
    ]
}

var initialData = {
    "Andares": [
        "Rés-do-Chão",
        "1º Andar",
        "2º Andar",
        "3º Andar",
        "4º Andar",
        "5º Andar",
        "6º Andar",
        "7º Andar"
    ],
    "Recursos": [
        "Projetor",
        "Material de Escritório",
        "Flipchart",
        "Microfone",
        "Laser"
    ],

    "Tipos_de_Reuniao": [
        "Formação",
        "Externa",
        "Interna"
    ]
};

var resources = {
    "piso-0": [{
            "NomeSala": "Sala 0.1",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": true,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "30"
            }
        },
        {
            "NomeSala": "Sala 0.2",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": false,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 0.3",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": false,
                "Flipchart": false,
                "Microfone": true,
                "Laser": false,
                "N_Pessoas": "10"
            }
        },
        {
            "NomeSala": "Sala 0.4",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": false,
                "N_Pessoas": "20"
            }
        }
    ],
    "piso-1": [{
            "NomeSala": "Sala 1.1",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 1.2",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "10"
            }
        },
        {
            "NomeSala": "Sala 1.3",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "30"
            }
        },
        {
            "NomeSala": "Sala 1.4",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        }
    ],
    "piso-2": [{
            "NomeSala": "Sala 2.1",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 2.2",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 2.3",
            "Recursos": {
                "Projetor": false,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "30"
            }
        },
        {
            "NomeSala": "Sala 2.4",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        }
    ],
    "piso-3": [{
            "NomeSala": "Sala 3.1",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 3.2",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 3.3",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 3.4",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        }
    ],
    "piso-4": [{
            "NomeSala": "Sala 4.1",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 4.2",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 4.3",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 4.4",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        }
    ],
    "piso-5": [{
            "NomeSala": "Sala 5.1",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 5.2",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 5.3",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 5.4",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        }
    ],
    "piso-6": [{
            "NomeSala": "Sala 6.1",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 6.2",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 6.3",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 6.4",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        }
    ],
    "piso-7": [{
            "NomeSala": "Sala 7.1",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 7.2",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": "Sims",
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 7.3",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        },
        {
            "NomeSala": "Sala 7.4",
            "Recursos": {
                "Projetor": true,
                "Material_de_Escritorio": true,
                "Flipchart": false,
                "Microfone": true,
                "Laser": true,
                "N_Pessoas": "20"
            }
        }
    ]


};
