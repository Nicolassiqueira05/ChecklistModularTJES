let button = document.querySelector("#GenerateButton");

let t = {
  "documentacão geral": [
    {
      "site": "Carteira de Trabalho (página com foto)",
      "sei": "(X) Carteira de Trabalho (página com foto);"
    },
    {
      "site": "Carteira de Identidade",
      "sei": "(X) Carteira de Identidade;"
    },
    {
      "site": "Cadastro de Pessoa Física (CPF)",
      "sei": "(X) Cadastro de Pessoa Física (CPF);"
    },
    {
      "site": "Comprovante de Residência",
      "sei": "(X) Comprovante de Residência;"
    },
    {
      "site": "PIS/PASEP/NIT",
      "sei": "(X) PIS/PASEP;"
    },
    {
      "site": "Cartão de Benefício de Aposentadoria (caso seja aposentado)",
      "sei": "(X) Cartão de Benefício de Aposentadoria (caso seja aposentado);"
    },
    {
      "site": "ASO (Atestado de Saúde Ocupacional)",
      "sei": "(X) ASO fornecido por médico do trabalho, com validade de até 60 (sessenta) dias, contados da data de emissão;"
    },
    {
      "site": "Comprovante de situação cadastral no CPF",
      "sei": "(X) Comprovante de situação cadastral no Cadastro de Pessoas Físicas;"
    },
    {
      "site": "Comprovante de dados bancários (Banestes)",
      "sei": "(X) Comprovante de dados bancários, no qual conste número da agência e da conta corrente de sua titularidade mantida no Banco do Estado do Espírito Santo – BANESTES S.A;"
    },
    {
      "site": "Declaração da Instituição de Ensino (Pós-Graduação, Mestrado, Doutorado e Pós-Doutorado) ou comprovação de conclusão do curso há até 5 anos",
      "sei": "(X) Declaração da Instituição de Ensino que comprove vínculo educacional (Pós-Graduação, Mestrado, Doutorado e Pós-Doutorado);"
    },
    {
      "site": "Diploma e/ou comprovante de conclusão de curso",
      "sei": "(X) Diploma e/ou comprovante de conclusão de curso;"
    },
    {
      "site": "Declaração de não inscrição ativa junto à OAB (licenciamento, caso possua inscrição)",
      "sei": "(X) Declaração de não inscrição ativa junto a OAB;"
    }
  ],
  "Formulários": [
    {
      "site": "Formulário I - Ficha Cadastral",
      "sei": "(X) Formulário I - Ficha Cadastral; (Formulário I)"
    },
    {
      "site": "Formulário V - Declaração sobre antecedentes criminais, com firma reconhecida",
      "sei": "(X) Formulário V- Declaração assinada pelo Residente, com firma reconhecida, na qual conste não ter sido indiciado em inquérito policial ou processado criminalmente ou, quando houver, notícia da ocorrência com os esclarecimentos pertinentes, para fins de análise da vida pregressa e atual e da conduta individual e social do aluno selecionado; (Formulário V)"
    },
    {
      "site": "Formulário VI - Declaração de não-vínculo Profissional",
      "sei": "(X) Declaração de não-vínculo Profissional; (Formulário VI)"
    },
    {
      "site": "Formulário VIII - Declaração de Parentesco",
      "sei": "(X) Formulário VIII - Declaração de Parentesco; (Formulário VIII)"
    }
  ],
  "certidoes negativas": [
    {
      "site": "Certidão Negativa Eleitoral",
      "sei": "(X) Certidão Negativa da Justiça Eleitoral (serviço oferecido pelo Tribunal Superior Eleitoral - TSE); (Obtida no sítio eletrônico do TSE);"
    },
    {
      "site": "Certidão Negativa Militar",
      "sei": "(X) Certidão Negativa da Justiça Militar (serviço oferecido pelo Superior Tribunal Militar - STM); (Obtida no sítio eletrônico do STM);"
    },
    {
      "site": "Certidão Criminal Estadual - TJES (1ª Instância)",
      "sei": "(X) Certidões negativas dos distribuidores criminais das Justiças Federal, Estadual ou do Distrito Federal dos lugares em que tenha residido nos últimos 5 (cinco) anos. (1ª Instância);"
    },
    {
      "site": "Certidão Criminal Estadual - TJES (2ª Instância)",
      "sei": "(X) Certidões negativas dos distribuidores criminais das Justiças Federal, Estadual ou do Distrito Federal dos lugares em que tenha residido nos últimos 5 (cinco) anos. (2ª Instância);"
    },
    {
      "site": "Certidão Criminal Federal - TRF (2ª Região)",
      "sei": "(X) Certidões negativas dos distribuidores criminais das Justiças Federal, Estadual ou do Distrito Federal dos lugares em que tenha residido nos últimos 5 (cinco) anos. (2ª Região);"
    }
  ]
};

let json = JSON.stringify(t);
const pendencias = JSON.parse(json);

let indexGlobal = 0;
let dragAtivo = true; // Controla se o arraste está habilitado ou não

// Atualiza a interface (botão e cursores) conforme o estado de 'dragAtivo'
function atualizarEstadoDrag() {
  const items = document.querySelectorAll("#items .item");
  const btnToggle = document.querySelector("#toggle-drag");
  const clearDrag = document.querySelector("#clear-drag");

  items.forEach((item) => {
    item.setAttribute("draggable", dragAtivo);
    const handle = item.querySelector(".drag-handle");
    if (handle) {
      handle.style.cursor = dragAtivo ? "grab" : "not-allowed";
      handle.style.opacity = dragAtivo ? "1" : "0.3";
    }
  });

  if (btnToggle) {
    btnToggle.innerHTML = 
    `<svg class="icon" height="24px" viewBox="0 -960 960 960" width="24px">       
        ${!dragAtivo ? 
          '<path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>' 
          :
          '<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>'
        }
    </svg>`
    !dragAtivo ? clearDrag.style = "display: none;" : clearDrag.style = "display: flex;" 
    btnToggle.classList.toggle("disabled", !dragAtivo);
  }
}

document.querySelector("#clear-drag")?.addEventListener("click", () => {
  resetarOrdem()
})

document.querySelector("#toggle-drag")?.addEventListener("click", () => {
  dragAtivo = !dragAtivo;
  if(dragAtivo == false){
    salvarOrdem()
  }
  atualizarEstadoDrag();
});

function carregarPend() {
  const itemsContainer = document.querySelector("#items");
  itemsContainer.innerHTML = "";
  indexGlobal = 0;

  for (const [categoria, documentos] of Object.entries(t)) {
    itemsContainer.innerHTML += `<div class="section-title">${categoria}</div>`;
    
    for (const documento of documentos) {
      itemsContainer.innerHTML += `
        <div class="item" draggable="true">
          <span class="drag-handle" style="margin-right: 8px;">⋮⋮</span>
          <input type="checkbox" id="check${indexGlobal}" data-index="${indexGlobal}">
          <label for="check${indexGlobal}">${documento.site}</label>
        </div>`;
      indexGlobal++;
    }
  }

  habilitarDragAndDrop();
  atualizarEstadoDrag();
}

function habilitarDragAndDrop() {
  const container = document.querySelector("#items");
  let itemArrastado = null;

  container.addEventListener("dragstart", (e) => {
  if (!dragAtivo) {
    e.preventDefault();
    return;
  }

  const item = e.target.closest(".item");
  if (item) {
    itemArrastado = item;
    setTimeout(() => item.classList.add("dragging"), 0);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", "");
  }
});

  container.addEventListener("dragend", (e) => {
    const item = e.target.closest(".item");
    if (item) {
      item.classList.remove("dragging");
      itemArrastado = null;
    }
  });

  container.addEventListener("dragenter", (e) => {
    if (dragAtivo) e.preventDefault();
  });

  container.addEventListener("dragover", (e) => {
    if (!dragAtivo) return;

    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const elementoAbaixo = getElementoAbaixo(container, e.clientY);

    if (itemArrastado) {
      if (elementoAbaixo == null) {
        container.appendChild(itemArrastado);
      } else {
        container.insertBefore(itemArrastado, elementoAbaixo);
      }
    }
  });
}

function getElementoAbaixo(container, y) {
  const elementosEditaveis = [...container.querySelectorAll(".item:not(.dragging)")];

  return elementosEditaveis.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;

    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

carregarPend();

function Objeto(setor) {
  let splitedArray = setor.split(" ");
  if (splitedArray[0].charAt(splitedArray[0].length - 1) == "o" || splitedArray[0].charAt(splitedArray[0].length - 1) == "O") {
    return "À (AO)";
  } else if (splitedArray[0].charAt(splitedArray[0].length - 1) == "a" || splitedArray[0].charAt(splitedArray[0].length - 1) == "A") {
    return "À (AO)";
  } else {
    return "À (AO)";
  }
}

async function writeClipboardHTML(htmlText, plainText) {
  try {
    const blobHTML = new Blob([htmlText], { type: "text/html" });
    const blobText = new Blob([plainText], { type: "text/plain" });
    const data = [new ClipboardItem({
      "text/html": blobHTML,
      "text/plain": blobText
    })];
    await navigator.clipboard.write(data);
    window.alert("Copiado com sucesso para o SEI!");
  } catch (error) {
    window.alert("Erro ao copiar, peça para o Nicolas checar o console");
    console.error("Erro ao copiar: ", error);
  }
}

function getCor(cor) {
  if (cor == "amarelo") return "#fbff00";
  if (cor == "vermelho") return "#ff0040b9";
  if (cor == "rosa") return "#ff31dd96";
}

button.addEventListener("click", () => {
  const getPendencia = (id, texto) => {
    const el = document.getElementById(id);
    return (el && !el.checked) ? texto : null;
  };

  const pendenciasGerais = [];
  let index = 0;

  for (const documentos of Object.values(pendencias)) {
    for (const documento of documentos) {
      pendenciasGerais.push(
        getPendencia(`check${index}`, documento.sei)
      );
      index++;
    }
  }
  
  let corpoDocumentos = [
    ...pendenciasGerais,
  ].filter(i => i !== null).join(ls.getItem("spacing") == "true" ? "<br><br>" : "<br>");

  let htmlContent = `
    <div style="font-family: Arial, sans-serif; font-size: 10pt; line-height: 1.5; color: #000;">
        <p><b>${Objeto(document.querySelector("#input-setor").value)} ${document.querySelector("#input-setor").value}</b></p>
        <p>Prezado (a) Senhor (a),</p>
        <p>Considerando que a emissão do <b>Termo de Compromisso de Estágio</b> deve ser nos termos da <b>Resolução nº 036/2025</b>, bem como o <b>Ato Normativo TJES nº 007/2026</b>.</p>
        <p>Considerando que a documentação apresentada está em desacordo com a referida Resolução, conforme descrito e assinalado abaixo, devolvemos para regularização e reenvio a esta <b>Seção de Seleção e Acompanhamento de Estágio</b> para prosseguimento e análise do pedido:</p>
       
        <p style="margin: 0; font-weight: ${ls.getItem("bold") == "true" ? 700 : 400}; background-color: ${getCor(ls.getItem("cor"))}">${corpoDocumentos}</p>
       
        <p>Atenciosamente,<br>
        ${document.querySelector("#input-nome").value}
        </p>

    </div>`;

  writeClipboardHTML(htmlContent, htmlContent.replace(/<[^>]*>/g, ''));
});

function salvarOrdem() {
  const itemsContainer = document.querySelector("#items");
  if (!itemsContainer) return;

  const checkboxes = itemsContainer.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((chk) => {
    chk.setAttribute("data-checked", chk.checked);
  });

  localStorage.setItem("checklist_items_html", itemsContainer.innerHTML);
}

function resetarOrdem() {
  localStorage.removeItem("checklist_items_html");
  carregarPend();
}

function restaurarOrdem() {
  const htmlSalvo = localStorage.getItem("checklist_items_html");
  if (!htmlSalvo) return false;

  const itemsContainer = document.querySelector("#items");
  itemsContainer.innerHTML = htmlSalvo;

  // Restaura o estado das caixas de seleção
  const checkboxes = itemsContainer.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((chk) => {
    chk.checked = chk.getAttribute("data-checked") === "true";
  });

  return true;
}
restaurarOrdem();
dragAtivo = !dragAtivo;
atualizarEstadoDrag();