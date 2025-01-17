import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Grid2
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

  const otherStats = [
    { label: 'Países', value: cantidadPaises, icon: <Public /> },
    { label: 'Top 300 QS', value: cantidad_qs, icon: <School /> },
    { label: 'Consorcios', value: cantidad_consorcios, icon: <Groups /> },
  ];

  return (
    <Grid2 container spacing={1}>
      <Grid2 item xs={12} sm={12}>
        <>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Description />
              <Typography variant="h6">Convenios</Typography>
            </Stack>
            <Divider sx={{ marginY: 2 }} />

            <Stack direction="column" divider={<Divider orientation="vertical" flexItem />}>
              {statsCard.map((item) => (
                <Stack key={item.label} alignItems="center">
                  <Typography variant="subtitle1">{item.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    {item.value}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ marginY: 2 }} />
            <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              {otherStats.map((item) => (
                <Stack key={item.label} direction="row" alignItems="center" spacing={2}>
                  {item.icon}
                  <Typography variant="subtitle1">{item.label}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>
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

  return <ReactECharts option={options} style={{ height: '100%', marginTop: '20px' }} />;
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
    series: [
      {
        type: 'treemap', // Changed from 'sunburst' to 'treemap'
        data: chartData,
        label: {
          show: true,
          formatter: '{b}: {c}',
        },
        upperLabel: {
          show: true,
          height: 30,
        },
        roam: false,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: '600px' }} />;
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
    <Container maxWidth="xl" sx={{ paddingY: 4 }} >


      {/* Sección de tarjetas principales */}


      <Card variant="outlined"  >
        <Grid2 container >
          <Grid2 size={4}>
            <MetricsCards data={data} />
          </Grid2>
          <Grid2 container ></Grid2>
          <Grid2 size={8}>
            <VencidosChart data={data} />
          </Grid2>
        </Grid2>
      </Card>

      <Grid2 container style={{ marginTop: '10px' }} spacing={2}>

        <Grid2 size={12}>
          <Card variant='outlined' style={{ padding: '40px' }} >
            <TiposChart tipos={data.tipos} />
          </Card>
        </Grid2>

        <Grid2 size={12}>
          <Card variant='outlined' style={{ padding: '40px' }} >
            <SubclasificacionesChart subclasificaciones={data.subclasificaciones} />
          </Card>
        </Grid2>

        <Grid2 size={12}>
          <Card variant='outlined' style={{ padding: '40px' }} >
                  <NivelesChart niveles={data.niveles} />
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
