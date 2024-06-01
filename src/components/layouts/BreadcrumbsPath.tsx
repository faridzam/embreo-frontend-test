import { colors } from '@/constants/colors'
import { capitalizeFirstLetter } from '@/utils/strings'
import { Breadcrumbs } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const BreadcrumbsPath = () => {
  const { pathname } = useLocation()
  let url = ''
  const breadcrumbLinks = pathname.split('/').map(segment => {
    url += `/${segment}`
    return (
      <Link
        key={`link-${segment === '' ? 'Home' : segment}`}
        to={`${import.meta.env.VITE_BASE_URL + url}`}
        style={{ textDecoration: 'none', color: colors.black.main }}
      >
        {segment === '' ? 'Home' : capitalizeFirstLetter(segment)}
      </Link>
    )
  })

  return <Breadcrumbs>{breadcrumbLinks}</Breadcrumbs>
}

export default BreadcrumbsPath
