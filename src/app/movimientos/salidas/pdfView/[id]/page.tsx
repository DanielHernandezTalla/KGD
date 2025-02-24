'use client';
import { useState, useEffect } from 'react';
import { useRequest } from '../../../../../hooks/useRequest';
import { PDFViewer, Document } from '@react-pdf/renderer';
import DocumentPDF from '../../pdf/[id]';
import { Form } from '@/components/atoms';
import { handlePost } from '@/utils/handlePost';
import { FORMINPUT } from '@/interface/types';

export default function PdfView({ params }: { params: { id: number } }) {
  const { data }: { data: any; isLoading: boolean } = useRequest(`SalidasCabecera/${params.id}`);
  console.log(data);

  return (
    <div className='flex'>
      <PDFViewer style={{ width: '100vw', height: '100vh' }}>
        <Document>
          <DocumentPDF data={data?.dato}></DocumentPDF>
        </Document>
      </PDFViewer>
    </div>
  );
}
