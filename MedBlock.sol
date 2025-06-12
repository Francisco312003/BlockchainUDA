// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedBlock {
    // Estructuras de datos
    struct Medico {
        address direccion;
        string nombre;
        string especialidad;
        string cedula;
        bool activo;
    }
    
    struct Paciente {
        address direccion;
        string nombre;
        string fechaNacimiento;
        string documento;
        bool activo;
    }
    
    struct HistorialClinico {
        uint256 id;
        address paciente;
        address medico;
        string diagnostico;
        string tratamiento;
        string medicamentos;
        uint256 fecha;
    }
    
    // Mappings para almacenar datos
    mapping(address => Medico) public medicos;
    mapping(address => Paciente) public pacientes;
    mapping(uint256 => HistorialClinico) public historiales;
    mapping(address => mapping(address => bool)) public permisos;
    
    // Variables de estado
    uint256 private contadorHistoriales;
    address public owner;
    
    // Eventos
    event MedicoRegistrado(address indexed direccion, string nombre);
    event PacienteRegistrado(address indexed direccion, string nombre);
    event HistorialCreado(uint256 indexed id, address paciente, address medico);
    event PermisoOtorgado(address paciente, address medico);
    event PermisoRevocado(address paciente, address medico);
    
    // Modificadores
    modifier soloOwner() {
        require(msg.sender == owner, "Solo el owner puede ejecutar esta funcion");
        _;
    }
    
    modifier direccionValida(address _direccion) {
        require(_direccion != address(0), "Direccion invalida");
        _;
    }
    
    // Constructor
    constructor() {
        owner = msg.sender;
    }
    
    // Funciones para médicos
    function registrarMedico(
        string memory _nombre,
        string memory _especialidad,
        string memory _cedula
    ) public {
        require(!medicos[msg.sender].activo, "Medico ya registrado");
        require(bytes(_nombre).length > 0, "El nombre no puede estar vacio");
        require(bytes(_especialidad).length > 0, "La especialidad no puede estar vacia");
        require(bytes(_cedula).length > 0, "La cedula no puede estar vacia");
        
        medicos[msg.sender] = Medico({
            direccion: msg.sender,
            nombre: _nombre,
            especialidad: _especialidad,
            cedula: _cedula,
            activo: true
        });
        
        emit MedicoRegistrado(msg.sender, _nombre);
    }
    
    function esMedicoRegistrado(address _direccion) public view returns (bool) {
        return medicos[_direccion].activo;
    }
    
    // Funciones para pacientes
    function registrarPaciente(
        string memory _nombre,
        string memory _fechaNacimiento,
        string memory _documento
    ) public {
        require(!pacientes[msg.sender].activo, "Paciente ya registrado");
        require(bytes(_nombre).length > 0, "El nombre no puede estar vacio");
        require(bytes(_fechaNacimiento).length > 0, "La fecha de nacimiento no puede estar vacia");
        require(bytes(_documento).length > 0, "El documento no puede estar vacio");
        
        pacientes[msg.sender] = Paciente({
            direccion: msg.sender,
            nombre: _nombre,
            fechaNacimiento: _fechaNacimiento,
            documento: _documento,
            activo: true
        });
        
        emit PacienteRegistrado(msg.sender, _nombre);
    }
    
    function esPacienteRegistrado(address _direccion) public view returns (bool) {
        return pacientes[_direccion].activo;
    }
    
    // Funciones para historiales clínicos
    function crearHistorialClinico(
        address _paciente,
        string memory _diagnostico,
        string memory _tratamiento,
        string memory _medicamentos
    ) public direccionValida(_paciente) {
        require(medicos[msg.sender].activo, "Solo medicos pueden crear historiales");
        require(pacientes[_paciente].activo, "Paciente no registrado");
        require(permisos[_paciente][msg.sender], "No tiene permiso para acceder a este paciente");
        require(bytes(_diagnostico).length > 0, "El diagnostico no puede estar vacio");
        
        uint256 id = contadorHistoriales++;
        
        historiales[id] = HistorialClinico({
            id: id,
            paciente: _paciente,
            medico: msg.sender,
            diagnostico: _diagnostico,
            tratamiento: _tratamiento,
            medicamentos: _medicamentos,
            fecha: block.timestamp
        });
        
        emit HistorialCreado(id, _paciente, msg.sender);
    }
    
    // Funciones para permisos
    function otorgarPermiso(address _medico) public direccionValida(_medico) {
        require(pacientes[msg.sender].activo, "Solo pacientes pueden otorgar permisos");
        require(medicos[_medico].activo, "Medico no registrado");
        require(!permisos[msg.sender][_medico], "El permiso ya fue otorgado");
        
        permisos[msg.sender][_medico] = true;
        emit PermisoOtorgado(msg.sender, _medico);
    }
    
    function revocarPermiso(address _medico) public direccionValida(_medico) {
        require(pacientes[msg.sender].activo, "Solo pacientes pueden revocar permisos");
        require(permisos[msg.sender][_medico], "No hay permiso para revocar");
        
        permisos[msg.sender][_medico] = false;
        emit PermisoRevocado(msg.sender, _medico);
    }
    
    // Funciones de consulta
    function obtenerHistorialesPaciente(address _paciente) public view direccionValida(_paciente) returns (uint256[] memory) {
        require(pacientes[_paciente].activo, "Paciente no registrado");
        
        uint256[] memory ids = new uint256[](contadorHistoriales);
        uint256 contador = 0;
        
        for(uint256 i = 0; i < contadorHistoriales; i++) {
            if(historiales[i].paciente == _paciente) {
                ids[contador] = i;
                contador++;
            }
        }
        
        return ids;
    }
    
    function obtenerHistorialesMedico(address _medico) public view direccionValida(_medico) returns (uint256[] memory) {
        require(medicos[_medico].activo, "Medico no registrado");
        
        uint256[] memory ids = new uint256[](contadorHistoriales);
        uint256 contador = 0;
        
        for(uint256 i = 0; i < contadorHistoriales; i++) {
            if(historiales[i].medico == _medico) {
                ids[contador] = i;
                contador++;
            }
        }
        
        return ids;
    }
    
    function obtenerHistorial(uint256 _id) public view returns (HistorialClinico memory) {
        require(_id < contadorHistoriales, "ID de historial invalido");
        return historiales[_id];
    }
} 