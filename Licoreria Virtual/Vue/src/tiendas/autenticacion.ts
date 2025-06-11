import { defineStore } from "pinia"
import { supabase, type Usuario } from "../conexion/supabase"
import { ref } from "vue"

export const useAuthStore = defineStore("auth", () => {
  const usuario = ref<Usuario | null>(null)
  const cargando = ref(false)

  const cargarPerfilUsuario = async (correo: string) => {
    try {
      const { data, error } = await supabase
        .from("usuario")  // Cambiado a singular
        .select("*")
        .eq("correo", correo)
        .single()

      if (error) {
        console.error("Error al cargar perfil:", error)
        return null
      }

      usuario.value = data
      return data
    } catch (error) {
      console.error("Error al cargar perfil:", error)
      return null
    }
  }

  const iniciarSesion = async (correo: string, contraseña: string) => {
    cargando.value = true

    try {
      const { data, error } = await supabase
        .from("usuario")  // Cambiado a singular
        .select("*")
        .eq("correo", correo)
        .eq("contraseña", contraseña)
        .single()

      if (error || !data) {
        throw new Error("Correo o contraseña incorrectos")
      }

      usuario.value = data
      return data
    } catch (err: any) {
      console.error("Error de inicio de sesión:", err.message)
      alert("Error: " + err.message)
      throw err
    } finally {
      cargando.value = false
    }
  }

  const registrarse = async (nombre: string, correo: string, contraseña: string, ubicacion: string) => {
    cargando.value = true

    try {
      // Verificar si el correo ya existe
      const { data: existingUser, error: checkError } = await supabase
        .from("usuario")  // Cambiado a singular
        .select("correo")
        .eq("correo", correo)
        .maybeSingle()

      if (existingUser) {
        throw new Error("Este correo ya está registrado")
      }

      // Insertar nuevo usuario
      const { data: newUser, error: insertError } = await supabase
        .from("usuario")  // Cambiado a singular
        .insert({
          nombre,
          correo,
          contraseña,
          ubicacion
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      usuario.value = newUser
      alert("Registro exitoso. Ahora puedes iniciar sesión.")
      return newUser
    } catch (error: any) {
      console.error("Error en registro:", error)
      alert("Error: " + error.message)
      throw error
    } finally {
      cargando.value = false
    }
  }

  const cerrarSesion = () => {
    usuario.value = null
  }

  return {
    usuario,
    cargando,
    iniciarSesion,
    registrarse,
    cerrarSesion,
  }
})