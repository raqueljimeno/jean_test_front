import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { Spinner } from 'react-bootstrap'
import { useApi } from 'api'
import { Invoice } from 'types'

const InvoiceShow = () => {
  const { id } = useParams<{ id: string }>()
  const api = useApi()
  const [invoice, setInvoice] = useState<Invoice>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    api.getInvoice(id).then(({ data }) => {
      setInvoice(data)
      setLoading(false)
    })
  }, [api, id])

  return (
    <>
      {loading ? (
        <div style={{ padding: '10rem 10rem', textAlign: 'center' }}>
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <div>{JSON.stringify(invoice ?? '', null, 2)}</div>
        </>
      )}
    </>
  )
}

export default InvoiceShow
