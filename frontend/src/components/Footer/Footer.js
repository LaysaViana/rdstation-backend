import { Box, Typography, Link, IconButton } from '@mui/material';

export const Footer = () => {
  return (
    <Box component="footer" className="app-footer" sx={{ mt: 6 }}>
      <div className="w-full mx-auto max-w-7xl px-4 md:px-6">
        <Box
          sx={{
            py: 2,
            textAlign: 'center',
            transition: 'background-color 200ms ease, color 200ms ease',
          }}
        >
          <Typography variant="body2" component="div" sx={{ fontWeight: 500 }}>
            Desenvolvido por <strong>Laysa Viana</strong>
          </Typography>

          <Box
            sx={{ mt: 1, display: 'inline-flex', gap: 1, alignItems: 'center' }}
          >
            <Link
              href="https://github.com/LaysaViana"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub - Laysa Viana"
              underline="none"
            >
              <IconButton size="small" aria-label="GitHub">
                <img
                  src="/github.png"
                  width={20}
                  height={20}
                  className="github-icon"
                  alt=""
                />
              </IconButton>
            </Link>

            <Link
              href="https://linkedin.com/in/laysa-viana"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn - Laysa Viana"
              underline="none"
            >
              <IconButton size="small" aria-label="LinkedIn">
                <img
                  src="/linkedin.png"
                  alt=""
                  width={20}
                  height={20}
                  style={{ display: 'block' }}
                />
              </IconButton>
            </Link>
          </Box>
        </Box>
      </div>
    </Box>
  );
};
