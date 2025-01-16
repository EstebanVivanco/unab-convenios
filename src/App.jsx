import React from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid,
  Stack,
  Divider
} from '@mui/material';
import {
  Description,
  Public,
  School,
  Groups
} from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

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
  cantidad_consorcios: 3
};

/**
 * Componente de tarjetas con los valores principales
 */
function MetricsCards({ data }) {
  const {
    total,
    vigentes,
    vencidos,
    cantidadPaises,
    cantidad_qs,
    cantidad_consorcios,
  } = data;

  const statsCard = [
    { label: 'Total', value: total },
    { label: 'Vigentes', value: vigentes },
    { label: 'Vencidos', value: vencidos },
  ];

  const otherCards = [
    { label: 'Países', value: cantidadPaises, icon: <Public /> },
    { label: 'Top 300 QS', value: cantidad_qs, icon: <School /> },
    { label: 'Consorcios', value: cantidad_consorcios, icon: <Groups /> },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Card variant="outlined">
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Description />
              <Typography variant="h6">Convenios</Typography>
            </Stack>
            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              {statsCard.map((item) => (
                <Stack key={item.label} alignItems="center">
                  <Typography variant="subtitle1">{item.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      {otherCards.map((item) => (
        <Grid item xs={4} sm={4} key={item.label}>
          <Card variant="outlined">
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                {item.icon}
                <Typography variant="subtitle1">{item.label}</Typography>
              </Stack>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {item.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

/**
 * Gráfico de barras para Vencidos por rango de días
 */
function VencidosChart({ data }) {
  const { d_30, d_60, d_90, d_mas } = data;

  const options = {
    title: {
      text: 'Vencidos por rango de días',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['0-30 días', '31-60 días', '61-90 días', '90+ días'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [d_30, d_60, d_90, d_mas],
        type: 'bar',
        color: '#151e2f',
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '400px' }} />;
}

/**
 * Gráfico de Pie para Subclasificaciones
 */
function SubclasificacionesChart({ subclasificaciones }) {
  const chartData = subclasificaciones.map((item) => ({
    name: item.nombre,
    value: item.cantidad,
  }));

  const options = {
    title: {
      text: 'Subclasificaciones',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      bottom: '0',
    },
    series: [
      {
        name: 'Cantidad',
        type: 'pie',
        radius: '50%',
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '400px' }} />;
}

/**
 * Gráfico de barras horizontal para Niveles
 */
function NivelesChart({ niveles }) {
  const categories = niveles.map((item) => item.nombre);
  const values = niveles.map((item) => item.cantidad);

  const options = {
    title: {
      text: 'Niveles',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      data: categories,
    },
    series: [
      {
        data: values,
        type: 'bar',
        color: '#3f51b5',
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '400px' }} />;
}

/**
 * Gráfico de Dona para Tipos de Convenio
 */
function TiposChart({ tipos }) {
  const chartData = tipos.map((item) => ({
    name: item.nombre,
    value: item.cantidad,
  }));

  const options = {
    title: {
      text: 'Tipos de Convenios',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      bottom: '0',
    },
    series: [
      {
        name: 'Cantidad',
        type: 'pie',
        radius: ['40%', '70%'], // dona
        data: chartData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '400px' }} />;
}

/**
 * Componente principal del Dashboard
 */
function Dashboard({ data }) {
  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>


      {/* Sección de tarjetas principales */}
      <MetricsCards data={data} />

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={8}>
          <VencidosChart data={data} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TiposChart tipos={data.tipos} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12} md={12}>
          <SubclasificacionesChart subclasificaciones={data.subclasificaciones} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NivelesChart niveles={data.niveles} />
        </Grid>
      </Grid>
    </Container>
  );
}

/**
 * App principal para renderizar el Dashboard
 */
export default function App() {
  return <Dashboard data={mockData} />;
}
