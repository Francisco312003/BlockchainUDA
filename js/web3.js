// Configuración de Web3
let web3;
let contrato;
const contratoAddress = "0xe59C51Ce3B4D559F659A0c9E565F700DC7d60422"; // Reemplazar con la dirección del contrato desplegado
const contratoABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_paciente",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_diagnostico",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tratamiento",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_medicamentos",
				"type": "string"
			}
		],
		"name": "crearHistorialClinico",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "paciente",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "medico",
				"type": "address"
			}
		],
		"name": "HistorialCreado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "direccion",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			}
		],
		"name": "MedicoRegistrado",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_medico",
				"type": "address"
			}
		],
		"name": "otorgarPermiso",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "direccion",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			}
		],
		"name": "PacienteRegistrado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "paciente",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "medico",
				"type": "address"
			}
		],
		"name": "PermisoOtorgado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "paciente",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "medico",
				"type": "address"
			}
		],
		"name": "PermisoRevocado",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nombre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_especialidad",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_cedula",
				"type": "string"
			}
		],
		"name": "registrarMedico",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_nombre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fechaNacimiento",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_documento",
				"type": "string"
			}
		],
		"name": "registrarPaciente",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_medico",
				"type": "address"
			}
		],
		"name": "revocarPermiso",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_direccion",
				"type": "address"
			}
		],
		"name": "esMedicoRegistrado",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_direccion",
				"type": "address"
			}
		],
		"name": "esPacienteRegistrado",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "historiales",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "paciente",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "medico",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "diagnostico",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tratamiento",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "medicamentos",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "fecha",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "medicos",
		"outputs": [
			{
				"internalType": "address",
				"name": "direccion",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "especialidad",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "cedula",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "activo",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "obtenerHistorial",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "paciente",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "medico",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "diagnostico",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "tratamiento",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "medicamentos",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "fecha",
						"type": "uint256"
					}
				],
				"internalType": "struct MedBlock.HistorialClinico",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_medico",
				"type": "address"
			}
		],
		"name": "obtenerHistorialesMedico",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_paciente",
				"type": "address"
			}
		],
		"name": "obtenerHistorialesPaciente",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "pacientes",
		"outputs": [
			{
				"internalType": "address",
				"name": "direccion",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "nombre",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fechaNacimiento",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "documento",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "activo",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "permisos",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Reemplazar con el ABI del contrato

// Inicializar Web3
async function initWeb3() {
    console.log("Iniciando verificación de MetaMask...");
    
    // Verificar si MetaMask está instalado
    if (typeof window.ethereum !== 'undefined') {
        console.log("MetaMask detectado");
        
        try {
            // Solicitar acceso a la cuenta
            console.log("Solicitando acceso a la cuenta...");
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts',
                params: []
            });
            
            console.log("Cuenta conectada:", accounts[0]);
            
            // Inicializar Web3
            web3 = new Web3(window.ethereum);
            console.log("Web3 inicializado");
            
            // Inicializar contrato
            contrato = new web3.eth.Contract(contratoABI, contratoAddress);
            console.log("Contrato inicializado");
            
            // Escuchar cambios de cuenta
            window.ethereum.on('accountsChanged', function (accounts) {
                console.log("Cuenta cambiada:", accounts[0]);
                window.location.reload();
            });
            
            // Escuchar cambios de red
            window.ethereum.on('chainChanged', function (chainId) {
                console.log("Red cambiada:", chainId);
                window.location.reload();
            });
            
            // Verificar la red
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            console.log("ID de la red actual:", chainId);
            
            if (chainId !== '0xaa36a7') { // ID de Sepolia
                console.log("Advertencia: No estás en la red Sepolia");
                alert("Por favor, cambia a la red Sepolia en MetaMask");
            }
            
            console.log("Web3 inicializado correctamente");
            return true;
        } catch (error) {
            console.error("Error detallado al inicializar Web3:", error);
            mostrarError("Error al conectar con MetaMask: " + error.message);
            return false;
        }
    } else {
        console.error("MetaMask no detectado");
        mostrarError("Por favor instala MetaMask para usar esta aplicación");
        return false;
    }
}

// Función para verificar el estado de MetaMask
async function verificarEstadoMetaMask() {
    console.log("Verificando estado de MetaMask...");
    
    if (typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            console.log("Cuentas disponibles:", accounts);
            
            if (accounts.length > 0) {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                console.log("ID de la red:", chainId);
                
                if (chainId === '0xaa36a7') {
                    console.log("Conectado a Sepolia");
                    return { conectado: true, red: 'Sepolia' };
                } else {
                    console.log("Conectado a otra red");
                    return { conectado: true, red: 'otra' };
                }
            } else {
                console.log("No hay cuentas conectadas");
                return { conectado: false, red: null };
            }
        } catch (error) {
            console.error("Error al verificar estado:", error);
            return { conectado: false, red: null, error: error.message };
        }
    } else {
        console.log("MetaMask no instalado");
        return { conectado: false, red: null, error: "MetaMask no instalado" };
    }
}

// Funciones de utilidad
function mostrarError(mensaje) {
    console.error("Error:", mensaje);
    alert("Error: " + mensaje);
}

function mostrarExito(mensaje) {
    console.log("Éxito:", mensaje);
    alert("Éxito: " + mensaje);
}

// Funciones para médicos
async function registrarMedico(nombre, especialidad, cedula) {
    try {
        if (!await initWeb3()) return;
        
        const accounts = await web3.eth.getAccounts();
        const isMedico = await contrato.methods.esMedicoRegistrado(accounts[0]).call();
        
        if (isMedico) {
            mostrarError("Ya estás registrado como médico");
            return;
        }
        
        await contrato.methods.registrarMedico(nombre, especialidad, cedula)
            .send({ from: accounts[0] });
        mostrarExito("Médico registrado exitosamente");
    } catch (error) {
        console.error("Error al registrar médico:", error);
        mostrarError("Error al registrar médico: " + error.message);
    }
}

// Funciones para pacientes
async function registrarPaciente(nombre, fechaNacimiento, documento) {
    try {
        if (!await initWeb3()) return;
        
        const accounts = await web3.eth.getAccounts();
        const isPaciente = await contrato.methods.esPacienteRegistrado(accounts[0]).call();
        
        if (isPaciente) {
            mostrarError("Ya estás registrado como paciente");
            return;
        }
        
        await contrato.methods.registrarPaciente(nombre, fechaNacimiento, documento)
            .send({ from: accounts[0] });
        mostrarExito("Paciente registrado exitosamente");
    } catch (error) {
        console.error("Error al registrar paciente:", error);
        mostrarError("Error al registrar paciente: " + error.message);
    }
}

// Funciones para historiales clínicos
async function crearHistorialClinico(paciente, diagnostico, tratamiento, medicamentos) {
    try {
        if (!await initWeb3()) return;
        
        const accounts = await web3.eth.getAccounts();
        const isMedico = await contrato.methods.esMedicoRegistrado(accounts[0]).call();
        
        if (!isMedico) {
            mostrarError("Solo los médicos pueden crear historiales");
            return;
        }
        
        const isPaciente = await contrato.methods.esPacienteRegistrado(paciente).call();
        if (!isPaciente) {
            mostrarError("El paciente no está registrado");
            return;
        }
        
        await contrato.methods.crearHistorialClinico(paciente, diagnostico, tratamiento, medicamentos)
            .send({ from: accounts[0] });
        mostrarExito("Historial clínico creado exitosamente");
    } catch (error) {
        console.error("Error al crear historial:", error);
        mostrarError("Error al crear historial: " + error.message);
    }
}

// Funciones para permisos
async function otorgarPermiso(medico) {
    try {
        if (!await initWeb3()) return;
        
        const accounts = await web3.eth.getAccounts();
        const isPaciente = await contrato.methods.esPacienteRegistrado(accounts[0]).call();
        
        if (!isPaciente) {
            mostrarError("Solo los pacientes pueden otorgar permisos");
            return;
        }
        
        const isMedico = await contrato.methods.esMedicoRegistrado(medico).call();
        if (!isMedico) {
            mostrarError("El médico no está registrado");
            return;
        }
        
        await contrato.methods.otorgarPermiso(medico)
            .send({ from: accounts[0] });
        mostrarExito("Permiso otorgado exitosamente");
    } catch (error) {
        console.error("Error al otorgar permiso:", error);
        mostrarError("Error al otorgar permiso: " + error.message);
    }
}

async function revocarPermiso(medico) {
    try {
        if (!await initWeb3()) return;
        
        const accounts = await web3.eth.getAccounts();
        const isPaciente = await contrato.methods.esPacienteRegistrado(accounts[0]).call();
        
        if (!isPaciente) {
            mostrarError("Solo los pacientes pueden revocar permisos");
            return;
        }
        
        await contrato.methods.revocarPermiso(medico)
            .send({ from: accounts[0] });
        mostrarExito("Permiso revocado exitosamente");
    } catch (error) {
        console.error("Error al revocar permiso:", error);
        mostrarError("Error al revocar permiso: " + error.message);
    }
}

// Funciones de consulta
async function obtenerHistorialesPaciente(paciente) {
    try {
        if (!await initWeb3()) return [];
        
        const isPaciente = await contrato.methods.esPacienteRegistrado(paciente).call();
        if (!isPaciente) {
            mostrarError("El paciente no está registrado");
            return [];
        }
        
        const historiales = await contrato.methods.obtenerHistorialesPaciente(paciente).call();
        return historiales;
    } catch (error) {
        console.error("Error al obtener historiales:", error);
        mostrarError("Error al obtener historiales: " + error.message);
        return [];
    }
}

async function obtenerHistorialesMedico(medico) {
    try {
        if (!await initWeb3()) return [];
        
        const isMedico = await contrato.methods.esMedicoRegistrado(medico).call();
        if (!isMedico) {
            mostrarError("El médico no está registrado");
            return [];
        }
        
        const historiales = await contrato.methods.obtenerHistorialesMedico(medico).call();
        return historiales;
    } catch (error) {
        console.error("Error al obtener historiales:", error);
        mostrarError("Error al obtener historiales: " + error.message);
        return [];
    }
}

async function obtenerHistorial(id) {
    try {
        if (!await initWeb3()) return null;
        
        const historial = await contrato.methods.obtenerHistorial(id).call();
        return historial;
    } catch (error) {
        console.error("Error al obtener historial:", error);
        mostrarError("Error al obtener historial: " + error.message);
        return null;
    }
}

// Detectar el rol de la wallet conectada
async function obtenerRolWalletConectada() {
    if (!window.ethereum) return null;
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (!accounts || accounts.length === 0) return null;
    const address = accounts[0];
    const esMedico = await contrato.methods.esMedicoRegistrado(address).call();
    if (esMedico) return 'medico';
    const esPaciente = await contrato.methods.esPacienteRegistrado(address).call();
    if (esPaciente) return 'paciente';
    return null;
}

// Exportar la función para usar en otras páginas
window.obtenerRolWalletConectada = obtenerRolWalletConectada;

// Inicializar Web3 cuando se carga la página
window.addEventListener('load', async function() {
    console.log("Página cargada, iniciando verificación...");
    const estado = await verificarEstadoMetaMask();
    console.log("Estado de MetaMask:", estado);
    
    if (estado.conectado) {
        if (estado.red === 'Sepolia') {
            initWeb3();
        } else {
            mostrarError("Por favor, cambia a la red Sepolia en MetaMask");
        }
    } else {
        mostrarError(estado.error || "Por favor, conecta MetaMask");
    }
}); 