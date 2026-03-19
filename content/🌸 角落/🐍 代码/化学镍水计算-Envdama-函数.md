---
publish: true
created: 2026-01-30T22:58:25.129+08:00
modified: 2024-08-06T09:51:53.992+08:00
tags:
  - 化学镍水
  - 芬顿
  - 电芬顿
  - 碱次钠
  - 成本
  - 代码
cssclasses: ""
---

## Python代码
```python
import sys
 
def Fenton(Q, TP, NH3):
    # 计算需要七水硫酸亚铁的量(kg)，其中铁和磷摩尔比为1：1
    m_FeSO4_7H2O = TP / 31 / 1000 * Q * 278
    # 计算需要27%双氧水的量（kg），其中双氧水和磷摩尔比为1.5：1
    m_H2O2 = TP / 31 / 1000 * Q * 34 * 1.5 / 0.27
    # 计算去除氨氮需要的10%次钠的量（kg），其中次钠和氨氮摩尔比为1.5：1
    m_NaClO_NH3 = NH3 / 17 / 1000 * Q * 74.5 * 1.5 / 0.1
    
    # 返回结果，保留两位小数
    return round(m_FeSO4_7H2O, 2), round(m_H2O2, 2), round(m_NaClO_NH3, 2)

def Electro_Fenton(Q, TP, I):
    # 计算需要电解出铁的量(kg)，其中铁和磷摩尔比为1：1
    m_Fe = TP / 31 / 1000 * Q * 56
    # 计算所需电子数(mol)
    e = TP / 31 / 1000 * Q * 2
    # 1Ah电子摩尔数(mol/Ah)
    emol = 0.0373113707625438
    # 计算电解时间(h)
    t = e / emol / I
    # 计算用电量（Ah）
    Ah = e / emol
    # 计算需要30%盐酸的量（kg），其中盐酸和铁摩尔比为2：1
    m_HCl = TP / 31 / 1000 * Q * 36.5 * 2 / 0.3
    # 双氧水和次钠（氧化氨氮）用量同芬顿工艺，故不重复计算。
  
    # 返回结果，保留两位小数
    return round(m_Fe, 2), round(t, 2), round(Ah, 2), round(m_HCl, 2)

def Sodium_hypochlorite(Q, TP):
    # 计算氧化次亚磷需要的10%次钠的量(kg)，其中次钠和磷摩尔比为2：1
    m_NaClO_P = TP / 31 / 1000 * Q * 74.5 * 2 / 0.1
    # 计算次钠（氧化氨氮）用量同芬顿工艺，故不重复计算。
    
    # 返回结果，保留两位小数
    return round(m_NaClO_P, 2)

def calculate_costs(m_FeSO4_7H2O, m_H2O2, m_NaClO_NH3, m_HCl, m_NaClO_P, cost_FeSO4_7H2O, cost_H2O2, cost_NaClO, cost_HCl):
    # 计算七水硫酸亚铁的成本，单价单位为元/kg。
    cost_FeSO4_7H2O = m_FeSO4_7H2O * (cost_FeSO4_7H2O or 3.5)
    # 计算27%双氧水的成本，单价单位为元/kg。
    cost_H2O2 = m_H2O2 * (cost_H2O2 or 2.0)
    # 计算去除氨氮所需次钠的成本，单价单位为元/kg。
    cost_NaClO_NH3 = m_NaClO_NH3 * (cost_NaClO or 0.7)
    # 计算盐酸的成本，单价单位为元/kg。
    cost_HCl = m_HCl * (cost_HCl or 0.4)
    # 计算氧化次亚磷所需次钠的成本，单价单位为元/kg。
    cost_NaClO_P = m_NaClO_P * (cost_NaClO or 0.7)
    # 电芬顿所需电费成本和各工艺污泥处置成本后续再补充

    # 返回结果，保留两位小数
    return round(cost_FeSO4_7H2O, 2), round(cost_H2O2, 2), round(cost_NaClO_NH3, 2), round(cost_HCl, 2), round(cost_NaClO_P, 2)

def getRes(a):
    # 调用输入的数据计算结果，其中a为数组，a[0]为Q,a[1]为TP,a[2]为NH3，a[3]为I，a[4]为cost_FeSO4_7H2O，a[5]为cost_H2O2，a[6]为cost_NaClO，a[7]为cost_HCl
    m_FeSO4_7H2O, m_H2O2, m_NaClO_NH3 = Fenton(a[0], a[1], a[2])
    m_Fe, t, Ah, m_HCl = Electro_Fenton(a[0], a[1], a[3])
    m_NaClO_P = Sodium_hypochlorite(a[0], a[1])
    cost_FeSO4_7H2O, cost_H2O2, cost_NaClO_NH3, cost_HCl, cost_NaClO_P = calculate_costs(m_FeSO4_7H2O, m_H2O2, m_NaClO_NH3, m_HCl, m_NaClO_P, a[4], a[5], a[6], a[7])

    return m_FeSO4_7H2O, m_H2O2, m_NaClO_NH3, m_Fe, t, Ah, m_HCl, m_NaClO_P, cost_FeSO4_7H2O, cost_H2O2, cost_NaClO_NH3, cost_HCl, cost_NaClO_P

if __name__ == '__main__':
    a = []
    for i in range(1, len(sys.argv)):
        a.append(float(sys.argv[i]))

    print(getRes(a))
```

## 主要功能和解释
上述代码脚本是用于处理化学镍水过程中的一些化学计算和成本估算，具体而言，它提供了三个不同的废水处理工艺，分别是Fenton法、电Fenton法和次氯酸钠氧化法。通过输入一系列参数，包括废水的特性以及药剂的成本，脚本可以计算出每种方法所需的药剂用量和相应的成本。

以下是代码的主要功能和解释：
1. Fenton法：计算去除总磷所需的七水硫酸亚铁（FeSO4·7H2O）、双氧水（H2O2，27%）和去除氨氮所需次氯酸钠（NaClO，10%）的量。
2. 电化学 Fenton 方法：计算去除总磷需要电解出铁的量、电解时间、用电量和需要盐酸（HCl，30%）的量，另外双氧水和次氯酸钠（去除氨氮）的量同Fenton法。
3. 次氯酸钠法：计算氧化次亚磷需要的次氯酸钠的量，另外去除氨氮所需次氯酸钠的量同Fenton法。
4. 成本计算：根据提供的各药剂单价计算每种工艺的成本。
5. 输入参数：输入化学镍水的流量（Q）、总磷浓度（TP）、氨氮浓度（NH3）、电流强度（I）、各药剂成本（可选，如果未提供将使用默认成本）。
6. 输出结果：输出每种工艺所需药剂的数量以及对应的成本。

## 使用示例
推荐您使用[化学镍水计算](https://www.envdama.com/meet/privatePool/pobject40e3)应用进行计算。该应用的界面如下所示，您只需输入基本参数（水量、总磷含量、氨氮含量、电流大小）和药剂单价（提供默认值）即可自动获得不同工艺所需的药剂量和对应成本。
![1706160477591.png](https://www.envdama.com:9000/onlcgform/5xjm00ctmh.png)