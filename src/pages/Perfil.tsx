import PerfilUsuario from "../components/perfil/PerfilUsuario";


function Perfil() {

  return (
    <div className="p-6 bg-[#002244] min-h-screen">
      
      <PerfilUsuario
        username="pedroTrej5"
        ranking={14}
        pais="Chile"
        avatarUrl="https://i.pravatar.cc/150?img=12"
        onLogout={() => alert("Tu no mete cabra")}        
        puntos={2400}
        logros={3}
        predicciones={4}
        nivel={1}
        xpActual={2}
        xpMax={4000}
      />
    </div>
  );

}

export default Perfil
