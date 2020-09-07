/* eslint-env jest */

const devices = require('puppeteer/DeviceDescriptors')
const iPhone = devices['iPhone 6']
const configPaths = require('../../../../config/paths.json')
const PORT = configPaths.ports.test

const baseUrl = 'http://localhost:' + PORT

describe('Header navigation', () => {
  beforeAll(async (done) => {
    await page.emulate(iPhone)
    done()
  })

  describe('when JavaScript is unavailable or fails', () => {
    beforeAll(async () => {
      await page.setJavaScriptEnabled(false)
      await page.goto(`${baseUrl}/components/header/with-navigation/preview`, {
        waitUntil: 'load'
      })
    })

    afterAll(async () => {
      await page.setJavaScriptEnabled(true)
    })

    it('shows the navigation', async () => {
      await expect(page).toMatchElement('.govuk-header__navigation', {
        visible: true,
        timeout: 1000
      })
    })
  })

  describe('when JavaScript is available', () => {
    describe('when no navigation is present', () => {
      it('exits gracefully with no errors', async () => {
        // Errors logged to the console will cause this test to fail
        await page.goto(`${baseUrl}/components/header/preview`, {
          waitUntil: 'load'
        })
      })
    })

    describe('on page load', () => {
      beforeAll(async () => {
        await page.goto(`${baseUrl}/components/header/with-navigation/preview`, {
          waitUntil: 'load'
        })
      })

      it('exposes the hidden state of the menu using aria-hidden', async () => {
        const ariaHidden = await page.$eval('.govuk-header__navigation',
          el => el.getAttribute('aria-hidden')
        )

        expect(ariaHidden).toBe('true')
      })

      it('exposes the collapsed state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval('.govuk-header__menu-button',
          el => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('false')
      })
    })

    describe('when menu button is pressed', () => {
      beforeAll(async () => {
        await page.goto(`${baseUrl}/components/header/with-navigation/preview`, {
          waitUntil: 'load'
        })
        await page.click('.govuk-js-header-toggle')
      })

      it('adds the --open modifier class to the menu, making it visible', async () => {
        const hasOpenClass = await page.$eval('.govuk-header__navigation',
          el => el.classList.contains('govuk-header__navigation--open')
        )

        expect(hasOpenClass).toBeTruthy()
      })

      it('adds the --open modifier class to the menu button', async () => {
        const hasOpenClass = await page.$eval('.govuk-header__menu-button',
          el => el.classList.contains('govuk-header__menu-button--open')
        )

        expect(hasOpenClass).toBeTruthy()
      })

      it('exposes the visible state of the menu using aria-hidden', async () => {
        const ariaHidden = await page.$eval('.govuk-header__navigation',
          el => el.getAttribute('aria-hidden')
        )

        expect(ariaHidden).toBe('false')
      })

      it('exposes the expanded state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval('.govuk-header__menu-button',
          el => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('true')
      })
    })

    describe('when menu button is pressed twice', () => {
      beforeAll(async () => {
        await page.goto(`${baseUrl}/components/header/with-navigation/preview`, {
          waitUntil: 'load'
        })
        await page.click('.govuk-js-header-toggle')
        await page.click('.govuk-js-header-toggle')
      })

      it('removes the --open modifier class from the menu, hiding it', async () => {
        const hasOpenClass = await page.$eval('.govuk-header__navigation',
          el => el.classList.contains('govuk-header__navigation--open')
        )

        expect(hasOpenClass).toBeFalsy()
      })

      it('removes the --open modifier class from the menu button', async () => {
        const hasOpenClass = await page.$eval('.govuk-header__menu-button',
          el => el.classList.contains('govuk-header__menu-button--open')
        )

        expect(hasOpenClass).toBeFalsy()
      })

      it('exposes the hidden state of the menu using aria-hidden', async () => {
        const ariaHidden = await page.$eval('.govuk-header__navigation',
          el => el.getAttribute('aria-hidden')
        )

        expect(ariaHidden).toBe('true')
      })

      it('exposes the collapsed state of the menu button using aria-expanded', async () => {
        const ariaExpanded = await page.$eval('.govuk-header__menu-button',
          el => el.getAttribute('aria-expanded')
        )

        expect(ariaExpanded).toBe('false')
      })
    })
  })
})