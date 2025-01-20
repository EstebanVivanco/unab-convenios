import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Grid2,
} from "@mui/material";
import { Public, School, Groups } from "@mui/icons-material";
import ReactECharts from "echarts-for-react";
import unab from "./assets/unab.png";

/**
 * DATA DE EJEMPLO (tu JSON)
 */
const mockData = {
  vigentes: 291,
  total: 657,
  vencidos: 366,
  d_30: 6,
  d_60: 12,
  d_90: 8,
  d_mas: 265,
  subclasificaciones: [
    { nombre: "INTERCAMBIO", cantidad: 90 },
    { nombre: "DOBLE TÍTULO", cantidad: 15 },
    { nombre: "COLABORACIÓN INVESTIGATIVA", cantidad: 17 },
    { nombre: "COLABORACIÓN DOCTORAL", cantidad: 17 },
    { nombre: "OTROS", cantidad: 24 },
    { nombre: "CURSO CORTO", cantidad: 24 },
    { nombre: "PASANTIA", cantidad: 10 },
    { nombre: "VIA DE TITULACIÓN", cantidad: 2 },
    { nombre: "COTUTELA DE TESIS", cantidad: 4 },
    { nombre: "CERTIFICADO INTERNACIONAL", cantidad: 6 },
  ],
  niveles: [
    { nombre: "PREGRADO", cantidad: 329 },
    { nombre: "POSTGRADO", cantidad: 282 },
    { nombre: "MAGISTER", cantidad: 229 },
    { nombre: "DOCTORADO", cantidad: 234 },
    { nombre: "CENTROS E INSTITUTOS", cantidad: 0 },
  ],
  cantidadPaises: 41,
  tipos: [
    { nombre: "Marco", cantidad: 141 },
    { nombre: "MOU", cantidad: 16 },
    { nombre: "Especifico", cantidad: 134 },
  ],
  cantidad_qs: 9,
  cantidad_consorcios: 3,
};

/**
 * Componente de tarjetas con los valores principales
 */
const MetricsCards = ({ data }) => {
  const {
    total,
    vigentes,
    vencidos,
    cantidadPaises,
    cantidad_qs,
    cantidad_consorcios,
  } = data;

  const statsCard = [
    { label: "Total", value: total },
    { label: "Vigentes", value: vigentes },
    { label: "Vencidos", value: vencidos },
  ];

  const otherStats = [
    { label: "Países", value: cantidadPaises, icon: <Public /> },
    { label: "Top 300 QS", value: cantidad_qs, icon: <School /> },
    { label: "Consorcios", value: cantidad_consorcios, icon: <Groups /> },
  ];

  return (
    <Grid2 container spacing={1}>
      <Grid2 item xs={12} sm={12}>
        <>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <img src={unab} style={{ width: "40px" }} />
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                {" "}
                CONVENIOS{" "}
              </Typography>
            </Stack>
            <Divider sx={{ marginY: 2 }} />

            <Stack
              direction="column"
              divider={<Divider orientation="vertical" flexItem />}
            >
              {statsCard.map((item) => (
                <Stack key={item.label} alignItems="center">
                  <Typography variant="subtitle1">{item.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ marginY: 2 }} />
            <Stack
              direction="row"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              {otherStats.map((item) => (
                <Stack
                  key={item.label}
                  direction="row"
                  alignItems="center"
                  spacing={2}
                >
                  {item.icon}
                  <Typography variant="subtitle1">{item.label}</Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", marginLeft: "auto" }}
                  >
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </>
      </Grid2>
    </Grid2>
  );
}

/**
 * Gráfico de barras para Vencidos por rango de días
 */
const VencidosChart = ({ data }) => {
  const { d_30, d_60, d_90, d_mas } = data;

  const options = {
    title: {
      text: "Vencidos por rango de días",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category",
      data: ["0-30 días", "31-60 días", "61-90 días", "90+ días"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [d_30, d_60, d_90, d_mas],
        type: "bar",
        color: "#151e2f",
      },
    ],
  };

  return (
    <ReactECharts
      option={options}
      style={{ height: "100%", marginTop: "20px" }}
    />
  );
}

/**
 * Gráfico de barras para Subclasificaciones
 */
const SubclasificacionesChart = ({ subclasificaciones }) => {
  return (
    <Grid2 container spacing={2}>
      {subclasificaciones
        .sort((a, b) => b.cantidad - a.cantidad)
        .map((item, index) => (
          <Grid2 key={item.nombre} xs={12} sm={6} md={4}>
            <Card
              variant="outlined"
              sx={{
                borderLeft: `6px solid ${
                  index % 2 === 0 ? "#ac142c" : "#0c1c2c"
                }`,
                borderRadius: 2,
                ":hover": {
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                },
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                >
                  {item.nombre}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#ac142c", fontWeight: "bold" }}
                >
                  Cantidad: {item.cantidad}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
    </Grid2>
  );
}

/**
 * Gráfico de barras horizontal para Niveles
 */
const NivelesChart = ({ niveles }) =>{
  const total = niveles.reduce((acc, nivel) => acc + nivel.cantidad, 0);
  const nivelesData = niveles
    .filter((nivel) => nivel.cantidad > 0) // Filtrar niveles con cantidad 0
    .map((nivel) => ({
      ...nivel,
      porcentaje: ((nivel.cantidad / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.cantidad - a.cantidad); // Ordenar de mayor a menor

  const options = {
    title: {
      text: "Niveles Académicos",
      left: "center",
      top: 10,
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        const nivel = nivelesData[params[0].dataIndex];
        return `${nivel.nombre}: ${nivel.cantidad} (${nivel.porcentaje}%)`;
      },
    },
    grid: {
      top: "15%",
      left: "20%",
      right: "15%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: nivelesData.map((nivel) => nivel.nombre),
      axisLabel: {
        fontSize: 12,
        fontWeight: "bold",
      },
    },
    series: [
      {
        type: "bar",
        data: nivelesData.map((nivel) => ({
          value: nivel.cantidad,
          itemStyle: {
            color: "#ac142c", // Cambiado de #3f51b5 a #ac142c
            opacity: 0.8,
          },
        })),
        label: {
          show: true,
          position: "right",
          formatter: function (params) {
            const nivel = nivelesData[params.dataIndex];
            return `${params.value} (${nivel.porcentaje}%)`;
          },
          fontSize: 12,
          fontWeight: "bold",
        },
        barWidth: "50%",
        emphasis: {
          itemStyle: {
            opacity: 1,
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "400px" }} />;
}

/**
 * Gráfico de barras apiladas al 100% para Tipos de Convenio
 */
const TiposChart = ({ tipos }) => {
  const total = tipos.reduce((acc, tipo) => acc + tipo.cantidad, 0);
  const porcentajes = tipos.map((tipo) => ({
    nombre: tipo.nombre,
    cantidad: tipo.cantidad,
    porcentaje: ((tipo.cantidad / total) * 100).toFixed(1),
  }));

  const options = {
    title: {
      text: "Tipos de Convenios",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params) {
        return `${params[0].name}: ${params[0].value} (${
          porcentajes[params[0].dataIndex].porcentaje
        }%)`;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      type: "category",
      data: tipos.map((tipo) => tipo.nombre),
    },
    series: [
      {
        type: "bar",
        data: tipos.map((tipo) => tipo.cantidad),
        itemStyle: {
          color: function (params) {
            const colors = ["#0c1c2c", "#44545d", "#ac142c"]; // Nuevos colores
            return colors[params.dataIndex];
          },
        },
        label: {
          show: true,
          position: "right",
          formatter: function (params) {
            const porcentaje = porcentajes[params.dataIndex].porcentaje;
            return `${params.value} (${porcentaje}%)`;
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: "300px" }} />;
}

/**
 * Componente principal del Dashboard
 */
const Dashboard = ({ data }) => {
  return (
    <Container maxWidth="xl" sx={{ paddingY: 4 }}>
      {/* Sección de tarjetas principales */}

      <Card variant="outlined">
        <Grid2 container>
          <Grid2 size={4}>
            <MetricsCards data={data} />
          </Grid2>
          <Grid2 container></Grid2>
          <Grid2 size={8}>
            <VencidosChart data={data} />
          </Grid2>
        </Grid2>
      </Card>

      <Grid2 container style={{ marginTop: "10px" }} spacing={2}>
        <Grid2 size={12}>
          <Card variant="outlined" style={{ padding: "40px" }}>
            <TiposChart tipos={data.tipos} />
          </Card>
        </Grid2>

        <Grid2 size={12}>
          <Card variant="outlined" style={{ padding: "40px" }}>
            <NivelesChart niveles={data.niveles} />
          </Card>
        </Grid2>

        <Grid2 size={12}>
          <Card variant="outlined" style={{ padding: "40px" }}>
            <SubclasificacionesChart
              subclasificaciones={data.subclasificaciones}
            />
          </Card>
        </Grid2>
        
      </Grid2>
    </Container>
  );
}

/**
 * App principal para renderizar el Dashboard
 */
export default function App() {
  return <Dashboard data={mockData} />;
}
