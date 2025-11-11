"use client";

import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Busca() {
  const [cep, setCep] = useState("");
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleBuscar = async () => {
    if (!cep.trim()) {
      setErro("Por favor, insira um CEP válido.");
      return;
    }

    setErro(null);
    setLoading(true);
    setDados(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro("CEP não encontrado.");
      } else {
        setDados(data);
      }
    } catch (error) {
      setErro("Erro ao buscar o CEP. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 600,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Busca de CEP
        </Typography>

        <Typography align="center" color="text.secondary" sx={{ mb: 4 }}>
          Digite um CEP abaixo para buscar informações sobre o endereço.
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid size ={{xs:12, sm:6}}>
            <TextField
              label="Digite o CEP"
              variant="outlined"
              fullWidth
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              inputProps={{ maxLength: 9 }}
            />
          </Grid>
          <Grid size ={{xs:12, sm:6}}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleBuscar}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Buscar"}
            </Button>
          </Grid>
        </Grid>

        {erro && (
          <Typography color="error" align="center" sx={{ mt: 3 }}>
            {erro}
          </Typography>
        )}

        {dados && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Resultado:
            </Typography>
            <Paper variant="outlined" sx={{ p: 2, bgcolor: "#fafafa" }}>
              <Typography><strong>CEP:</strong> {dados.cep}</Typography>
              <Typography><strong>Logradouro:</strong> {dados.logradouro}</Typography>
              <Typography><strong>Bairro:</strong> {dados.bairro}</Typography>
              <Typography><strong>Cidade:</strong> {dados.localidade}</Typography>
              <Typography><strong>Estado:</strong> {dados.uf}</Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
