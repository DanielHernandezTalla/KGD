import { Page, View, Text, Image } from '@react-pdf/renderer';

export default function DocumentPDF(data: any) {
  const styles: any = {
    page: {
      padding: '40pt 50pt'
    },
    header: {
      width: '30%',
      marginBottom: 10
    },
    section: {
      paddingTop: '20px',
      marginBottom: 20
    },
    table: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 0.5,
      borderColor: '#000',
      // borderRadius: 4,
      marginTop: 10
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 0.5,
      // borderRadius: 4,
      borderBottomColor: '#ddd',
      paddingVertical: 4
    },
    tableCol: {
      flex: 1,
      padding: 2
    },
    tableCell: {
      textAlign: 'center',
      fontSize: 9,
      paddingVertical: 2
    },
    tableColLeft: {
      textAlign: 'left'
    },
    tableColRight: {
      textAlign: 'right'
    },
    logo: {
      width: '100%'
    },
    footer: {
      marginTop: '42px',
      textAlign: 'center'
    },
    footerLine: {
      backgroundColor: 'black',
      width: '199px',
      height: '1px',
      margin: '0 auto'
    },
    footerText: {
      fontWeight: 'ultrabold',
      fontSize: 10,
      marginBottom: 8
    },
    footerCed: {
      fontSize: 10,
      marginBottom: 8
    }
  };

  return (
    <Page size='A4' style={{ padding: '40pt 50pt' }}>
      <View style={{ width: '30%' }}>
        <Image src='/logoPDF.png'></Image>
      </View>
      <View style={{ paddingTop: '20px' }}>
        <Text style={{ fontSize: '10px', paddingBottom: '6px' }}>
          DESCRIPCIÓN: {data?.data?.descripcion}
        </Text>
        <Text style={{ fontSize: '10px', paddingBottom: '6px' }}>
          FECHA: {data?.data?.fechA_SALIDA}
        </Text>
        <Text style={{ fontSize: '10px', paddingBottom: '6px' }}>
          ALMACEN: {data?.data?.nombrE_ALMACEN}
        </Text>
        <Text style={{ fontSize: '10px', paddingBottom: '6px' }}>
          PROVEEDOR: {data?.data?.nombrE_PROVEEDOR || 'No tiene'}
        </Text>
        <Text style={{ fontSize: '10px', paddingBottom: '6px' }}>
          EMPLEADO: {data?.data?.creadO_NOMBRE}
        </Text>
      </View>

      {/* Tabla de los detalles */}
      <View style={styles.table}>
        {/* Fila de encabezado */}
        <View style={[styles.tableRow, { borderBottomWidth: 1 }]}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ID Salida</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Descripción</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Almacén</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Almacén Destino</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Tipo Transacción</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Cantidad</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Costo</Text>
          </View>
        </View>
        {/* Filas de datos */}
        {data?.data?.lineas?.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.iD_DETAIL_SALIDA}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.item}</Text>
            </View>
            <View style={[styles.tableCol, styles.tableColLeft]}>
              <Text style={styles.tableCell}>{item.descripcion}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.nombrE_ALMACEN}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.nombrE_ALMACENDESTINO}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.nombrE_TIPOTRANSACCION}</Text>
            </View>
            <View style={[styles.tableCol, styles.tableColRight]}>
              <Text style={styles.tableCell}>{item.cantidad}</Text>
            </View>
            <View style={[styles.tableCol, styles.tableColRight]}>
              <Text style={styles.tableCell}>{item.costo}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* <View style={{ flexDirection: 'row' }}> */}
      {/* <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>ID Salida</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Item</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Descripción</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Almacén</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Almacén\nDestino</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Tipo Transacción</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Cantidad</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Costo</Text>
          </View>
        </View>

        {data?.data?.lineas?.map((item: any, index: number) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.iD_DETAIL_SALIDA}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.item}</Text>
            </View>
            <View style={styles.tableColLeft}>
              <Text style={styles.tableCell}>{item.descripcion}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.nombrE_ALMACEN}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.nombrE_ALMACENDESTINO}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.nombrE_TIPOTRANSACCION}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.cantidad}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>{item.costo}</Text>
            </View>
          </View>
        ))}
      </View> */}

      {/* <View style={{ width: '50vw', paddingLeft: '5vw', marginTop: '42px' }}>
        <Image src='/personasPDF.png' />
      </View> */}
      {/* </View> */}

      {/* FIRMAS DEL DOCUMENTO */}
      <View style={{ marginTop: '42px' }}>
        <View
          style={{ backgroundColor: 'black', width: '199px', height: '1px', margin: '0 auto' }}
        ></View>
        <Text
          style={{
            marginTop: '4px',
            textAlign: 'center',
            fontWeight: 'ultrabold',
            fontSize: '10px',
            marginBottom: '8px'
          }}
        >
          {/* Dr. Alejandro Acosta Borbón */}
          {data?.data?.creadO_NOMBRE}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'ultrabold',
            fontSize: '10px',
            marginBottom: '8px'
          }}
        >
          Encargado de almacen
        </Text>
        {/* <Text
          style={{
            textAlign: 'center',
            marginBottom: '8px',
            fontSize: '10px'
          }}
        >
          Ced. Esp. 8536439
        </Text> */}
      </View>
    </Page>
  );
}
// 'use client';
// import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

// export default function DocumentPDF({ data }) {
//   const styles = StyleSheet.create({
//     page: {
//       padding: '40pt 50pt'
//     },
//     header: {
//       width: '30%',
//       marginBottom: 10
//     },
//     section: {
//       paddingTop: '20px',
//       marginBottom: 20
//     },
//     table: {
//       width: '100%',
//       borderStyle: 'solid',
//       borderWidth: 0.5,
//       borderColor: '#000',
//       borderRadius: 4,
//       marginTop: 10
//     },
//     tableRow: {
//       flexDirection: 'row',
//       borderBottomWidth: 0.5,
//       borderBottomColor: '#ddd',
//       paddingVertical: 4
//     },
//     tableCol: {
//       flex: 1,
//       padding: 6
//     },
//     tableCell: {
//       textAlign: 'center',
//       fontSize: 9,
//       paddingVertical: 2
//     },
//     tableColLeft: {
//       textAlign: 'left'
//     },
//     tableColRight: {
//       textAlign: 'right'
//     },
//     logo: {
//       width: '100%'
//     },
//     footer: {
//       marginTop: '42px',
//       textAlign: 'center'
//     },
//     footerLine: {
//       backgroundColor: 'black',
//       width: '199px',
//       height: '1px',
//       margin: '0 auto'
//     },
//     footerText: {
//       fontWeight: 'ultrabold',
//       fontSize: 10,
//       marginBottom: 8
//     },
//     footerCed: {
//       fontSize: 10,
//       marginBottom: 8
//     }
//   });

//   return (
//     <Page style={styles.page}>
//       <View style={styles.header}>
//         <Image src='/logoPDF.png' style={styles.logo} />
//       </View>

//       <View style={styles.section}>
//         <Text style={{ fontSize: 10, paddingBottom: 6 }}>
//           DESCRIPCIÓN: {data?.data?.descripcion}
//         </Text>
//         <Text style={{ fontSize: 10, paddingBottom: 6 }}>FECHA: {data?.data?.fechA_SALIDA}</Text>
//         <Text style={{ fontSize: 10, paddingBottom: 6 }}>
//           ALMACÉN: {data?.data?.nombrE_ALMACEN}
//         </Text>
//         <Text style={{ fontSize: 10, paddingBottom: 6 }}>
//           PROVEEDOR: {data?.data?.nombrE_PROVEEDOR || 'No tiene'}
//         </Text>
//         <Text style={{ fontSize: 10, paddingBottom: 6 }}>
//           EMPLEADO: {data?.data?.creadO_NOMBRE}
//         </Text>
//       </View>

//       {/* Tabla de los detalles */}
//       <View style={styles.table}>
//         {/* Fila de encabezado */}
//         <View style={[styles.tableRow, { borderBottomWidth: 1 }]}>
//           <View style={styles.tableCol}>
//             <Text style={styles.tableCell}>ID Salida</Text>
//           </View>
//           <View style={styles.tableCol}>
//             <Text style={styles.tableCell}>Item</Text>
//           </View>
//           <View style={styles.tableCol}>
//             <Text style={styles.tableCell}>Descripción</Text>
//           </View>
//           <View style={styles.tableCol}>
//             <Text style={styles.tableCell}>Almacén</Text>
//           </View>
//           <View style={styles.tableCol}>
//             <Text style={styles.tableCell}>Almacén Destino</Text>
//           </View>
//           <View style={styles.tableCol}>
//             <Text style={styles.tableCell}>Tipo Transacción</Text>
//           </View>
//           <View style={styles.tableCol}>
//             <Text style={styles.tableCell}>Cantidad</Text>
//           </View>
//           <View style={styles.tableCol}>
//             <Text style={styles.tableCell}>Costo</Text>
//           </View>
//         </View>

//         {/* Filas de datos */}
//         {data?.data?.lineas?.map((item, index) => (
//           <View style={styles.tableRow} key={index}>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.iD_DETAIL_SALIDA}</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.item}</Text>
//             </View>
//             <View style={[styles.tableCol, styles.tableColLeft]}>
//               <Text style={styles.tableCell}>{item.descripcion}</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.nombrE_ALMACEN}</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.nombrE_ALMACENDESTINO}</Text>
//             </View>
//             <View style={styles.tableCol}>
//               <Text style={styles.tableCell}>{item.nombrE_TIPOTRANSACCION}</Text>
//             </View>
//             <View style={[styles.tableCol, styles.tableColRight]}>
//               <Text style={styles.tableCell}>{item.cantidad}</Text>
//             </View>
//             <View style={[styles.tableCol, styles.tableColRight]}>
//               <Text style={styles.tableCell}>{item.costo}</Text>
//             </View>
//           </View>
//         ))}
//       </View>

//       <View style={{ width: '50vw', paddingLeft: '5vw', marginTop: '42px' }}>
//         <Image src='/personasPDF.png' />
//       </View>

//       {/* FIRMAS DEL DOCUMENTO */}
//       <View style={styles.footer}>
//         <View style={styles.footerLine}></View>
//         <Text style={styles.footerText}>Dr. Alejandro Acosta Borbón</Text>
//         <Text style={styles.footerText}>Especialista en Medicina de Rehabilitación</Text>
//         <Text style={styles.footerCed}>Ced. Esp. 8536439</Text>
//       </View>
//     </Page>
//   );
// }
