import React, {useEffect, useState} from "react";
import { useAuth } from "../auth/AuthContext";
import { INSURED_URL }       from "../config/api";

export function Insureds(){

    const [content, setContent] = useState(<InsuredList  showForm={showForm}/>);

    function showList(){
        setContent(<InsuredList showForm={showForm} />);
    }

    function showForm(insured = {}) {
        setContent(<InsuredForm insured = {insured} showList={showList} />);
    }

    return (
        <>
            <div className="container my-5">
            {content}
            </div>
        </>
    );
}

function maskCellPhone(value) {
    const d = value.replace(/\D/g, "");
    const part1 = d.slice(0, 2);
    const part2 = d.slice(2, 7);
    const part3 = d.slice(7, 11);
  
    if (part3) return `(${part1}) ${part2}-${part3}`;
    if (part2) return `(${part1}) ${part2}`;
    if (part1) return `(${part1}`;
    return "";
  }

function maskCpfCnpj(value) {
    const digitsCpfCnpj = value.replace(/\D/g, '');
    if (digitsCpfCnpj.length <= 11) {
      // CPF
      return digitsCpfCnpj
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ
      return digitsCpfCnpj
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
}
  

function InsuredList(props) {
    const [insureds, setInsureds] = useState([]);
    const [error, setError] = useState('');
    const { abilities } = useAuth();
    const canEdit = abilities.includes("*");
  
    async function fetchInsureds() {
      setError('');
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) {
        setError('Você não está autenticado');
        return;
      }
    
        try {
          const response = await fetch(INSURED_URL, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
    
          if (response.status === 401) {
            throw new Error('Não autenticado, faça login novamente');
          }
          
          if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}`);
          }
    
          const result = await response.json();
          setInsureds(result.dados || []);
        } catch (err) {
          console.error(err);
          setError(err.message);
        }
      }
  
    useEffect(() => {
      fetchInsureds();
    }, []);

    async function deleteInsured(id){
      setError('');
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      try {
        const resp = await fetch(
          `${INSURED_URL}/${id}`,
          {
            method: 'DELETE',
            headers
          }
        );

        if (!resp.ok) {
          throw new Error(`Erro HTTP ${resp.status}`);
        }

        fetchInsureds();
      } catch (err) {
        console.error('Erro ao deletar segurado:', err);
        setError('Ocorreu um erro ao deletar. Tente novamente.');
      }
        
    }
  
    return (
      <>
        <h2 className="text-center mb-3">Lista de Segurados</h2>
        {error && (
        <div className="alert alert-danger text-center">{error}</div>
      )}
      {canEdit && (
        <button onClick={() => props.showForm()} className="btn btn-primary me-2">
          Novo
        </button>
      )}
        <button onClick={() => fetchInsureds()} className="btn btn-outline-primary me-2">
          Atualizar
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>E-mail</th>
              <th>Celular</th>
              <th>Data Criação</th>
              {canEdit && (
              <th>Ação</th>
              )}
            </tr>
          </thead>
          <tbody>
            {insureds.map((insured) => (
              <tr key={insured.id}>
                <td>{insured.id}</td>
                <td>{insured.name}</td>
                <td>{insured.cpf_cnpj}</td>
                <td>{insured.email}</td>
                <td>{insured.cell_phone}</td>
                <td>{new Date(insured.created_at).toLocaleString()}</td>
                {canEdit && (
                <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                  <button onClick={() => props.showForm(insured)} className="btn btn-primary btn-sm me-2">Editar</button>
                  <button onClick={() => deleteInsured(insured.id)} className="btn btn-danger btn-sm">Deletar</button>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  

  function InsuredForm(props) {
    const [validated, setValidated] = useState(false);
    const [apiError, setApiError] = useState("");         
    const [name, setName] = useState(props.insured.name || "");
    const [cpfCnpj, setCpfCnpj] = useState(props.insured.cpf_cnpj || "");
    const [email, setEmail] = useState(props.insured.email || "");
    const [cellPhone, setCellPhone] = useState(props.insured.cell_phone || "");
    const [address, setAddress] = useState(props.insured.address || "");
    const [address2, setAddress2] = useState(props.insured.address_line2 || "");
    const [neighborhood, setNeighborhood] = useState(props.insured.neighborhood || "");
    const [city, setCity] = useState(props.insured.city || "");
    const [state, setState] = useState(props.insured.state || "");

  
    function handleSubmit(event) {
      event.preventDefault();
      setValidated(true);
      setApiError("");                                    // limpa erro anterior
  
      const form = event.currentTarget;
      if (!form.checkValidity()) return;
  
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers.Authorization = `Bearer ${token}`;
  
      const payload = {
        name,
        cpf_cnpj: cpfCnpj,
        email,
        cell_phone: cellPhone,
        address,
        address_line2: address2,
        neighborhood,
        city,
        state,
        ...(props.insured.id && { id: props.insured.id })
      };
  
      const url = props.insured.id
        ? `${INSURED_URL}/${props.insured.id}`
        : INSURED_URL;
      const method = props.insured.id ? "PUT" : "POST";
  
      fetch(url, { method, headers, body: JSON.stringify(payload) })
        .then(async response => {
          if (response.status === 400) {
            setApiError("CPF /CNPJ e/ou Celular estão com o valor inválido");
            return null;
          }
          if (!response.ok) {
            throw new Error(`HTTP error, status = ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          if (data) {
            props.showList();
          }
        })
        .catch(err => {
          console.error("Erro ao salvar/editar segurado:", err);
          setApiError("Ocorreu um erro inesperado. Tente novamente.");
        });
    }

    return (
        <>
            <h2 className="text-center mb-3">{props.insured.id ? "Editar Segurado" : "Novo Segurado"}</h2>
            
            {apiError && (
              <div className="alert alert-warning text-center">
                {apiError}
              </div>
            )}
            <div className="row">
                <div className="col-lg-6 mx-auto">

                    <form
                          noValidate
                          className={validated ? "was-validated" : ""}
                          onSubmit={handleSubmit}
                    >
                    <input 
                      type="hidden" 
                      name="id" 
                      value={props.insured.id || ""} 
                    />
        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">
            Nome <span className="text-danger">*</span>
          </label>
          <div className="col-sm-8">
            <input
              type="text"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="invalid-feedback">Campo obrigatório</div>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">
            CPF / CNPJ <span className="text-danger">*</span>
          </label>
          <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            name="cpf_cnpj"
            value={cpfCnpj}
            onChange={e => setCpfCnpj(maskCpfCnpj(e.target.value))}
            placeholder="000.000.000-00 ou 00.000.000/0000-00"
            maxLength={18}
            required
            pattern="^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$"
            title="Digite um CPF (000.000.000-00) ou CNPJ (00.000.000/0000-00) válidos"
          />
        <div className="invalid-feedback">
            Informe um CPF ou CNPJ válido no formato indicado
        </div>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">
            E-mail <span className="text-danger">*</span>
          </label>
          <div className="col-sm-8">
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@exemplo.com"
              required
            />
            <div className="invalid-feedback">
              Informe um e-mail válido
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">
            Celular <span className="text-danger">*</span>
          </label>
          <div className="col-sm-8">
            <input
              type="tel"
              className="form-control"
              name="cell_phone"
              value={cellPhone}
              onChange={(e) => setCellPhone(maskCellPhone(e.target.value))}
              placeholder="(99) 99999-9999"
              maxLength={15}
              required
            />
            <div className="invalid-feedback">
              Campo obrigatório e deve ter 11 dígitos
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Endereço</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              name="address"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Complemento</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              name="address_line2"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Bairro</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              name="neighborhood"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Cidade</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="city"
            />
          </div>
        </div>

        <div className="row mb-3">
          <label className="col-sm-4 col-form-label">Estado</label>
          <div className="col-sm-8">
            <input
              className="form-control"
              value={state}
              onChange={(e) => setState(e.target.value)}
              name="state"
            />
          </div>
        </div>

        <div className="row">
          <div className="offset-sm-4 col-sm-4 d-grid">
            <button type="submit" className="btn btn-primary btn-sm">
              Salvar
            </button>
          </div>
          <div className="col-sm-4 d-grid">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={props.showList}
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>

                </div>

            </div>
        </>
    );
}