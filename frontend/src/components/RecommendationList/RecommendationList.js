import {
  Box,
  Typography,
  Chip,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useThemeMode } from '../../context/ThemeContext';

function RecommendationList({
  recommendations = [],
  mode = 'MultipleProducts',
}) {
  const theme = useTheme();
  const { mode: themeMode } = useThemeMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!recommendations.length) {
    return (
      <Paper
        elevation={0}
        sx={{
          mt: 3,
          p: { xs: 2, md: 3 },
          textAlign: 'center',
          border: '1px solid',
          borderColor: theme.palette.divider,
          bgcolor:
            themeMode === 'dark'
              ? theme.palette.background.paper
              : theme.palette.background.paper,
          borderRadius: 2,
        }}
      >
        <Typography color={theme.palette.text.secondary}>
          Nenhuma recomendação encontrada.
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          Tente ajustar suas preferências e clique em{' '}
          <strong>“Obter recomendação”</strong>.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Divider sx={{ mb: 3 }} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: theme.palette.text.primary }}
        >
          {mode === 'SingleProduct'
            ? 'Produto Recomendado'
            : 'Recomendações Encontradas'}
        </Typography>
        <Chip
          label={recommendations.length}
          color="primary"
          variant="outlined"
          sx={{
            fontWeight: 600,
            bgcolor:
              themeMode === 'dark'
                ? 'rgba(0,115,230,0.2)'
                : theme.palette.primary.light,
            color: theme.palette.primary.main,
          }}
        />
      </Box>

      {mode === 'SingleProduct' ? (
        <Paper
          elevation={2}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            transition: '0.3s',
            bgcolor:
              themeMode === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : theme.palette.background.paper,
            '&:hover': {
              transform: 'translateY(-3px)',
              boxShadow: theme.shadows[6],
            },
          }}
        >
          <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
            {recommendations[0].name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Categoria:{' '}
            <Box
              component="span"
              sx={{ fontWeight: 600, color: 'primary.main' }}
            >
              {recommendations[0].category}
            </Box>
          </Typography>

          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Preferências:</strong>{' '}
            {recommendations[0].preferences?.join(', ') || '—'}
          </Typography>
          <Typography variant="body2">
            <strong>Funcionalidades:</strong>{' '}
            {recommendations[0].features?.join(', ') || '—'}
          </Typography>

          {recommendations[0].score !== undefined && (
            <Box sx={{ mt: 3 }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
              >
                <Typography
                  variant="body2"
                  color={theme.palette.text.secondary}
                >
                  Compatibilidade
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: 'primary.main' }}
                >
                  {recommendations[0].score}%
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={Math.min(recommendations[0].score, 100)}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  bgcolor:
                    themeMode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    bgcolor: theme.palette.primary.main,
                  },
                }}
              />
            </Box>
          )}
        </Paper>
      ) : (
        <Paper
          elevation={2}
          sx={{
            borderRadius: 3,
            overflowX: 'auto',
            bgcolor:
              themeMode === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : theme.palette.background.paper,
          }}
        >
          <Table size={isMobile ? 'small' : 'medium'}>
            <TableHead
              sx={{
                bgcolor:
                  themeMode === 'dark'
                    ? 'rgba(0,115,230,0.2)'
                    : theme.palette.primary[50],
              }}
            >
              <TableRow>
                <TableCell
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  Produto
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  Categoria
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  Preferências
                </TableCell>
                <TableCell
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  Funcionalidades
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 600, color: theme.palette.text.primary }}
                >
                  Compatibilidade
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recommendations.map((r, index) => (
                <TableRow
                  key={r.id || index}
                  hover
                  sx={{
                    '&:hover': {
                      bgcolor:
                        themeMode === 'dark'
                          ? 'rgba(0,115,230,0.1)'
                          : theme.palette.primary[50],
                    },
                  }}
                >
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {r.name}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.primary }}>
                    {r.category}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>
                    {r.preferences?.slice(0, 3).join(', ') || '—'}
                  </TableCell>
                  <TableCell sx={{ color: theme.palette.text.secondary }}>
                    {r.features?.slice(0, 3).join(', ') || '—'}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={`${r.score || 0}%`}
                      size="small"
                      sx={{
                        bgcolor:
                          themeMode === 'dark'
                            ? 'rgba(0,115,230,0.15)'
                            : theme.palette.primary[100],
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
}

export default RecommendationList;
